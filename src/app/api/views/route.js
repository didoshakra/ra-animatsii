import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

export const dynamic = "force-dynamic"

export async function GET(req) {
  // Відповідаємо тільки тобі: має бути cookie no_track=1
  const cookie = req.headers.get("cookie") ?? ""
  if (!cookie.includes("no_track=1")) {
    return new Response(null, { status: 404 })
  }

  try {
    const rows = await sql`
      SELECT
        count(*)::int AS total,
        count(DISTINCT visitor_id)::int AS visitors,
        (count(*) FILTER (WHERE created_at >= date_trunc('day', now())))::int AS today,
        (count(*) FILTER (WHERE created_at >= now() - interval '7 days'))::int AS week
      FROM page_views
    `

    return Response.json(rows[0], {
      headers: { "Cache-Control": "private, max-age=300" },
    })
  } catch (e) {
    console.error("views error", e)
    return new Response(null, { status: 500 })
  }
}
