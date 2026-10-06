// track/route
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

const BOT_RE = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|curl|wget|python-requests/i

export async function POST(req) {
  const ua = req.headers.get("user-agent") ?? ""
  const cookie = req.headers.get("cookie") ?? ""

  // Пропускаємо ботів і твої візити
  if (!ua || BOT_RE.test(ua) || cookie.includes("no_track=1")) {
    return new Response(null, { status: 204 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(null, { status: 400 })
  }

  const path = String(body?.path ?? "").slice(0, 500)
  if (!path.startsWith("/")) return new Response(null, { status: 400 })

  const referrer = body?.referrer ? String(body.referrer).slice(0, 500) : null
  const visitorId = body?.visitorId ? String(body.visitorId).slice(0, 64) : null
  const country = req.headers.get("x-vercel-ip-country")

  try {
    await sql`
      INSERT INTO page_views (path, referrer, visitor_id, country)
      VALUES (${path}, ${referrer}, ${visitorId}, ${country})
    `
  } catch (e) {
    console.error("track error", e)
    return new Response(null, { status: 500 })
  }

  return new Response(null, { status: 204 })
}
