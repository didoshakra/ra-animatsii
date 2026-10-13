// scr/app/api/stats/route.js
import { neon } from "@neondatabase/serverless"
import { isAdmin } from "../../../lib/adminAuth"

const sql = neon(process.env.DATABASE_URL)

export const dynamic = "force-dynamic"

const TZ = "Europe/Kyiv"

// Список дат (YYYY-MM-DD) за останні n днів, включно із сьогодні
function lastDays(n) {
  const out = []
  for (let i = n - 1; i >= 0; i--) {
    out.push(new Date(Date.now() - i * 86400000).toLocaleDateString("sv-SE", { timeZone: TZ }))
  }
  return out
}

export async function GET(req) {
  if (!isAdmin(req)) return new Response(null, { status: 404 })

  const { searchParams } = new URL(req.url)
  const requested = Number(searchParams.get("days"))
  const days = [7, 30, 90].includes(requested) ? requested : 7
  // filter=clean -> без підозрілих (позначка *)
  const clean = searchParams.get("filter") === "clean"
  const host = (req.headers.get("host") ?? "").replace(/^www\./, "").replace(/:\d+$/, "")

  try {
    const [summary, daily, pages, sources, countries, langs, recent, sessionRows, topSections, topVideos] =
      await Promise.all([
        sql`
          SELECT
            (count(*) FILTER (WHERE (created_at AT TIME ZONE 'Europe/Kyiv')::date = (now() AT TIME ZONE 'Europe/Kyiv')::date))::int AS today,
            (count(*) FILTER (WHERE created_at >= now() - interval '7 days'))::int AS week,
            count(*)::int AS total,
            count(DISTINCT visitor_id)::int AS visitors_total,
            (count(*) FILTER (WHERE created_at >= now() - (${days}::int * interval '1 day')))::int AS period_views,
            (count(DISTINCT visitor_id) FILTER (WHERE created_at >= now() - (${days}::int * interval '1 day')))::int AS period_visitors
          FROM page_views_flagged
          WHERE (NOT ${clean}::boolean OR NOT suspicious)
        `,
        sql`
          SELECT to_char(created_at AT TIME ZONE 'Europe/Kyiv', 'YYYY-MM-DD') AS day,
                 count(*)::int AS views,
                 count(DISTINCT visitor_id)::int AS visitors
          FROM page_views_flagged
          WHERE created_at >= now() - (${days}::int * interval '1 day')
            AND (NOT ${clean}::boolean OR NOT suspicious)
          GROUP BY 1
        `,
        sql`
          SELECT regexp_replace(path, '^/[a-z]{2}(/|$)', '/') AS name,
                 count(*)::int AS views
          FROM page_views_flagged
          WHERE created_at >= now() - (${days}::int * interval '1 day')
            AND (NOT ${clean}::boolean OR NOT suspicious)
          GROUP BY 1 ORDER BY 2 DESC LIMIT 15
        `,
        sql`
          SELECT coalesce(nullif(substring(referrer from '^https?://([^/]+)'), ''), '(напряму)') AS name,
                 count(*)::int AS views
          FROM page_views_flagged
          WHERE created_at >= now() - (${days}::int * interval '1 day')
            AND (NOT ${clean}::boolean OR NOT suspicious)
          GROUP BY 1 ORDER BY 2 DESC LIMIT 30
        `,
        sql`
          SELECT coalesce(country, '—') AS name,
                 count(*)::int AS views,
                 count(DISTINCT visitor_id)::int AS visitors
          FROM page_views_flagged
          WHERE created_at >= now() - (${days}::int * interval '1 day')
            AND (NOT ${clean}::boolean OR NOT suspicious)
          GROUP BY 1 ORDER BY 2 DESC LIMIT 10
        `,
        sql`
          SELECT split_part(path, '/', 2) AS name, count(*)::int AS views
          FROM page_views_flagged
          WHERE created_at >= now() - (${days}::int * interval '1 day')
            AND path ~ '^/[a-z]{2}(/|$)'
            AND (NOT ${clean}::boolean OR NOT suspicious)
          GROUP BY 1 ORDER BY 2 DESC LIMIT 5
        `,
        sql`
          SELECT created_at, path, referrer, country, user_agent, suspicious
          FROM page_views_flagged
          WHERE (NOT ${clean}::boolean OR NOT suspicious)
          ORDER BY created_at DESC
          LIMIT 20
        `,
        // Останні 15 візитів із поведінкою (секції, відео, скрол)
        sql`
          WITH s AS (
            SELECT e.session_id, max(e.updated_at) AS last_at
            FROM engagement e
            WHERE e.created_at >= now() - (${days}::int * interval '1 day')
              AND (NOT ${clean}::boolean OR NOT EXISTS (
                SELECT 1 FROM page_views_flagged p WHERE p.visitor_id = e.visitor_id AND p.suspicious
              ))
            GROUP BY e.session_id
            ORDER BY max(e.updated_at) DESC
            LIMIT 15
          )
          SELECT e.session_id, e.visitor_id, e.kind, e.target, e.label, e.seconds, e.percent, e.is_last, s.last_at,
                 (SELECT p.country FROM page_views p WHERE p.visitor_id = e.visitor_id ORDER BY p.created_at DESC LIMIT 1) AS country
          FROM engagement e
          JOIN s ON s.session_id = e.session_id
          ORDER BY s.last_at DESC, e.id
        `,
        sql`
          SELECT e.target AS name,
                 count(DISTINCT e.session_id)::int AS views,
                 coalesce(round(avg(e.seconds)), 0)::int AS avg_seconds,
                 (count(*) FILTER (WHERE e.is_last))::int AS exits
          FROM engagement e
          WHERE e.kind = 'section'
            AND e.created_at >= now() - (${days}::int * interval '1 day')
            AND (NOT ${clean}::boolean OR NOT EXISTS (
              SELECT 1 FROM page_views_flagged p WHERE p.visitor_id = e.visitor_id AND p.suspicious
            ))
          GROUP BY 1 ORDER BY 2 DESC
        `,
        sql`
          SELECT e.target AS id,
                 max(e.label) AS name,
                 count(DISTINCT e.session_id)::int AS views,
                 coalesce(round(avg(e.seconds)), 0)::int AS avg_seconds,
                 coalesce(round(avg(e.percent)), 0)::int AS avg_percent
          FROM engagement e
          WHERE e.kind = 'video'
            AND e.created_at >= now() - (${days}::int * interval '1 day')
            AND (NOT ${clean}::boolean OR NOT EXISTS (
              SELECT 1 FROM page_views_flagged p WHERE p.visitor_id = e.visitor_id AND p.suspicious
            ))
          GROUP BY 1 ORDER BY 3 DESC LIMIT 12
        `,
      ])

    // Заповнюємо дні без переглядів нулями
    const byDay = new Map(daily.map((r) => [r.day, r]))
    const dailyFilled = lastDays(days).map((day) => ({
      day,
      views: byDay.get(day)?.views ?? 0,
      visitors: byDay.get(day)?.visitors ?? 0,
    }))

    // Прибираємо внутрішні переходи (referrer = твій же сайт)
    const externalSources = sources.filter((s) => s.name.replace(/^www\./, "") !== host).slice(0, 10)

    // Групуємо поведінку за візитами
    const sessionMap = new Map()
    for (const r of sessionRows) {
      let s = sessionMap.get(r.session_id)
      if (!s) {
        s = {
          session_id: r.session_id,
          visitor_id: r.visitor_id,
          country: r.country,
          last_at: r.last_at,
          sections: [],
          videos: [],
          scroll: null,
        }
        sessionMap.set(r.session_id, s)
      }
      if (r.kind === "section") s.sections.push({ id: r.target, seconds: r.seconds, is_last: r.is_last })
      else if (r.kind === "video")
        s.videos.push({ id: r.target, label: r.label, seconds: r.seconds, percent: r.percent })
      else if (r.kind === "scroll") s.scroll = r.percent
    }

    return Response.json(
      {
        days,
        filter: clean ? "clean" : "all",
        summary: summary[0],
        daily: dailyFilled,
        pages,
        sources: externalSources,
        countries,
        langs,
        recent,
        sessions: [...sessionMap.values()],
        topSections,
        topVideos,
      },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (e) {
    console.error("stats error", e)
    return new Response(null, { status: 500 })
  }
}
