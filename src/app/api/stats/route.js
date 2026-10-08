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
  const host = (req.headers.get("host") ?? "").replace(/^www\./, "").replace(/:\d+$/, "")

  try {
    const [summary, daily, pages, sources, countries, langs, recent] = await Promise.all([
      sql`
        SELECT
          (count(*) FILTER (WHERE (created_at AT TIME ZONE 'Europe/Kyiv')::date = (now() AT TIME ZONE 'Europe/Kyiv')::date))::int AS today,
          (count(*) FILTER (WHERE created_at >= now() - interval '7 days'))::int AS week,
          count(*)::int AS total,
          count(DISTINCT visitor_id)::int AS visitors_total,
          (count(*) FILTER (WHERE created_at >= now() - (${days}::int * interval '1 day')))::int AS period_views,
          (count(DISTINCT visitor_id) FILTER (WHERE created_at >= now() - (${days}::int * interval '1 day')))::int AS period_visitors
        FROM page_views
      `,
      sql`
        SELECT to_char(created_at AT TIME ZONE 'Europe/Kyiv', 'YYYY-MM-DD') AS day,
               count(*)::int AS views,
               count(DISTINCT visitor_id)::int AS visitors
        FROM page_views
        WHERE created_at >= now() - (${days}::int * interval '1 day')
        GROUP BY 1
      `,
      sql`
        SELECT regexp_replace(path, '^/[a-z]{2}(/|$)', '/') AS name,
               count(*)::int AS views
        FROM page_views
        WHERE created_at >= now() - (${days}::int * interval '1 day')
        GROUP BY 1 ORDER BY 2 DESC LIMIT 15
      `,
      sql`
        SELECT coalesce(nullif(substring(referrer from '^https?://([^/]+)'), ''), '(напряму)') AS name,
               count(*)::int AS views
        FROM page_views
        WHERE created_at >= now() - (${days}::int * interval '1 day')
        GROUP BY 1 ORDER BY 2 DESC LIMIT 30
      `,
      sql`
        SELECT coalesce(country, '—') AS name,
               count(*)::int AS views,
               count(DISTINCT visitor_id)::int AS visitors
        FROM page_views
        WHERE created_at >= now() - (${days}::int * interval '1 day')
        GROUP BY 1 ORDER BY 2 DESC LIMIT 10
      `,
      sql`
        SELECT split_part(path, '/', 2) AS name, count(*)::int AS views
        FROM page_views
        WHERE created_at >= now() - (${days}::int * interval '1 day')
          AND path ~ '^/[a-z]{2}(/|$)'
        GROUP BY 1 ORDER BY 2 DESC LIMIT 5
      `,
      sql`
        SELECT created_at, path, referrer, country, user_agent
        FROM page_views
        ORDER BY created_at DESC
        LIMIT 20
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

    return Response.json(
      {
        days,
        summary: summary[0],
        daily: dailyFilled,
        pages,
        sources: externalSources,
        countries,
        langs,
        recent,
      },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (e) {
    console.error("stats error", e)
    return new Response(null, { status: 500 })
  }
}
