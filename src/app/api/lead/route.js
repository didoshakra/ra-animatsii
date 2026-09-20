// src/app/api/lead/route.js
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^(\+?38)?0\d{9}$/

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, format } = body

    const rawEmail = String(email || "").trim()
    const rawPhone = String(phone || "").trim()

    const validPhone = rawPhone && PHONE_RE.test(rawPhone.replace(/[\s\-()]/g, ""))
    const validEmail = rawEmail && EMAIL_RE.test(rawEmail)

    if (!name) {
      return Response.json({ error: "Вкажіть ім'я" }, { status: 400 })
    }

    if (!validEmail && !validPhone) {
      // Немає жодного робочого контакту — відхиляємо з чіткою причиною
      if (rawEmail && !validEmail && !rawPhone) {
        return Response.json({ error: "Некоректний email" }, { status: 400 })
      }
      return Response.json({ error: "Вкажіть коректний email або телефон" }, { status: 400 })
    }

    // Якщо телефон валідний, а email — ні, просто не відправляємо биту адресу далі
    const cleanEmail = validEmail ? rawEmail : ""

    const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL
    if (!webhookUrl) {
      console.error("N8N_LEAD_WEBHOOK_URL не задано в env vars")
      return Response.json({ error: "Server misconfiguration" }, { status: 500 })
    }

    const host = request.headers.get("host") || ""

    const n8nRes = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email: cleanEmail,
        phone: validPhone ? rawPhone : "",
        message: message || "",
        format: format || "",
        source_host: host,
        submitted_at: new Date().toISOString(),
      }),
    })

    if (!n8nRes.ok) {
      const errText = await n8nRes.text()
      console.error("n8n webhook error:", n8nRes.status, errText)
      return Response.json({ error: "Не вдалося передати заявку в CRM" }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error("Lead API error:", err)
    return Response.json({ error: "Internal error" }, { status: 500 })
  }
}
