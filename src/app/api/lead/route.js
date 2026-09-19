// src/app/api/lead/route.js
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, format } = body

    if (!name || (!email && !phone)) {
      return Response.json({ error: "Вкажіть ім'я та email або телефон" }, { status: 400 })
    }

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
        email: email || "",
        phone: phone || "",
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
