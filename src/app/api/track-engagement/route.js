import { neon } from "@neondatabase/serverless"
import { isBot } from "@/lib/bots"

const sql = neon(process.env.DATABASE_URL)

const KINDS = new Set(["section", "video", "scroll"])

export async function POST(req) {
  const ua = req.headers.get("user-agent") ?? ""
  const cookie = req.headers.get("cookie") ?? ""

  if (isBot(ua) || cookie.includes("no_track=1")) {
    return new Response(null, { status: 204 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(null, { status: 400 })
  }

  const sessionId = String(body?.sessionId ?? "").slice(0, 64)
  if (!sessionId) return new Response(null, { status: 400 })
  const visitorId = body?.visitorId ? String(body.visitorId).slice(0, 64) : null

  // Санітизація й дедуплікація (kind + target) — інакше ON CONFLICT впаде
  const map = new Map()
  const raw = Array.isArray(body?.items) ? body.items.slice(0, 40) : []
  for (const it of raw) {
    const kind = String(it?.kind ?? "")
    const target = String(it?.target ?? "").slice(0, 120)
    if (!KINDS.has(kind) || !target) continue
    const seconds = Math.max(0, Math.min(86400, Math.round(Number(it?.seconds) || 0)))
    const percent = it?.percent == null ? null : Math.max(0, Math.min(100, Math.round(Number(it.percent) || 0)))
    map.set(`${kind}:${target}`, {
      kind,
      target,
      label: it?.label ? String(it.label).slice(0, 120) : null,
      seconds,
      percent,
      is_last: it?.isLast === true,
    })
  }
  const items = [...map.values()]
  if (items.length === 0) return new Response(null, { status: 204 })

  const json = JSON.stringify(items)

  try {
    await sql`
      INSERT INTO engagement (session_id, visitor_id, kind, target, label, seconds, percent, is_last)
      SELECT ${sessionId}::text, ${visitorId}::text, x.kind, x.target, x.label, x.seconds, x.percent, x.is_last
      FROM jsonb_to_recordset(${json}::jsonb)
        AS x(kind text, target text, label text, seconds int, percent int, is_last boolean)
      ON CONFLICT (session_id, kind, target) DO UPDATE SET
        label = EXCLUDED.label,
        seconds = EXCLUDED.seconds,
        percent = EXCLUDED.percent,
        is_last = EXCLUDED.is_last,
        updated_at = now()
    `
  } catch (e) {
    console.error("track-engagement error", e)
    return new Response(null, { status: 500 })
  }

  return new Response(null, { status: 204 })
}
