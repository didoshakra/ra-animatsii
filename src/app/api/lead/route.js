// src/app/api/lead/route.js
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, format } = body

    if (!name || (!email && !phone)) {
      return Response.json({ error: "Вкажіть ім'я та email або телефон" }, { status: 400 })
    }

    const apiKey = process.env.SALESDRIVE_API_KEY
    if (!apiKey) {
      console.error("SALESDRIVE_API_KEY не задано в env vars")
      return Response.json({ error: "Server misconfiguration" }, { status: 500 })
    }

    const host = request.headers.get("host") || ""

    const salesDriveRes = await fetch("https://raanimatsii.salesdrive.me/handler/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
      },
      body: JSON.stringify({
        getResultData: "1",
        fName: name,
        email: email || "",
        phone: phone || "",
        comment: message || "",
        con_comment: format || "",
        sajt: host,
      }),
    })

    if (!salesDriveRes.ok) {
      const errText = await salesDriveRes.text()
      console.error("SalesDrive error:", salesDriveRes.status, errText)
      return Response.json({ error: "Не вдалося передати заявку в CRM" }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error("Lead API error:", err)
    return Response.json({ error: "Internal error" }, { status: 500 })
  }
}
