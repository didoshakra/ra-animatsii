// src/app/api/lead/route.js
import { parseContact } from "@/lib/contact"

// Назви для менеджера (українською)
const FORMAT_LABELS = {
  short_advertisement: "Коротка реклама",
  commercial: "Рекламний ролик",
  brand_card: "Візитівка бренду",
  video_story: "Ролик-історія",
}

const clip = (v, max) =>
  String(v ?? "")
    .trim()
    .slice(0, max)

export async function POST(request) {
  try {
    const body = await request.json()

    // Приховане поле-пастка: люди його не бачать, боти заповнюють.
    if (clip(body.website, 200)) return Response.json({ ok: true })

    const name = clip(body.name, 100)
    const rawContact = clip(body.contact, 254)
    const message = clip(body.message, 2000)
    const company = clip(body.company, 150)
    const format = Object.hasOwn(FORMAT_LABELS, body.format) ? body.format : ""
    const lang = body.lang === "en" ? "en" : "uk"
    const page = clip(body.page, 200)
    const source = clip(body.source, 100)
    const a = body.attribution && typeof body.attribution === "object" ? body.attribution : {}

    if (!name) {
      return Response.json({ error: "Вкажіть ім'я" }, { status: 400 })
    }
    if (!rawContact) {
      return Response.json({ error: "Вкажіть, як з вами зв'язатися" }, { status: 400 })
    }

    const parsed = parseContact(rawContact)
    if (!parsed) {
      return Response.json({ error: "Вкажіть @нік у Telegram, email або номер телефону" }, { status: 400 })
    }

    const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL
    if (!webhookUrl) {
      console.error("N8N_LEAD_WEBHOOK_URL не задано в env vars")
      return Response.json({ error: "Server misconfiguration" }, { status: 500 })
    }

    const host = request.headers.get("host") || ""

    const n8nRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        contact: parsed.value,
        contact_type: parsed.type, // email | telegram | phone
        email: parsed.type === "email" ? parsed.value : "",
        phone: parsed.type === "phone" ? parsed.value : "",
        telegram: parsed.type === "telegram" ? parsed.value : "",
        message,
        company,
        format,
        format_label: FORMAT_LABELS[format] || "",
        lang,
        page,
        source,
        utm_source: clip(a.utm_source, 100),
        utm_medium: clip(a.utm_medium, 100),
        utm_campaign: clip(a.utm_campaign, 150),
        referrer: clip(a.referrer, 300),
        landing: clip(a.landing, 300),
        source_host: host,
        submitted_at: new Date().toISOString(),
      }),
    })

    const responseText = await n8nRes.text()
    let responseJson = null
    try {
      responseJson = JSON.parse(responseText)
    } catch {
      // не JSON: лишаємо null
    }

    if (!n8nRes.ok || (responseJson && responseJson.error)) {
      console.error("n8n webhook error:", n8nRes.status, responseText)
      const errMsg =
        (responseJson && (responseJson.message || responseJson.error)) || "Не вдалося передати заявку в CRM"
      return Response.json({ error: errMsg }, { status: n8nRes.ok ? 400 : 502 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error("Lead API error:", err)
    return Response.json({ error: "Internal error" }, { status: 500 })
  }
}
