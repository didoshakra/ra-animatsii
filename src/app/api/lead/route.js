import { NextResponse } from "next/server";

// Приймає заявку з форми контактів і створює лід у SalesDrive CRM.
// Потрібні змінні середовища (додати у Vercel → Settings → Environment Variables):
//   SALESDRIVE_DOMAIN   — напр. raanimatsii.salesdrive.me (є значення за замовчуванням нижче)
//   SALESDRIVE_API_KEY  — ключ з правами на створення заявок
//     (SalesDrive → Установки → Загальні налаштування і інтеграції → Інші сервіси → API)

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некоректний запит" }, { status: 400 });
  }

  const { name, contact, message, format } = body;

  if (!name || !contact) {
    return NextResponse.json(
      { error: "Вкажіть ім'я та контакт" },
      { status: 400 }
    );
  }

  const domain = process.env.SALESDRIVE_DOMAIN || "raanimatsii.salesdrive.me";
  const apiKey = process.env.SALESDRIVE_API_KEY;

  // Якщо CRM ще не підключена (немає ключа) — не валимо заявку,
  // а просто повертаємо успіх, щоб форма на сайті продовжувала працювати.
  if (!apiKey) {
    console.warn(
      "SalesDrive не налаштовано: відсутній SALESDRIVE_API_KEY (домен: " +
        domain +
        ")"
    );
    return NextResponse.json({ ok: true, crm: false });
  }

  try {
    const isEmail = contact.includes("@");

    const salesDriveRes = await fetch(`https://${domain}/api/order/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Form-Api-Key": apiKey,
      },
      body: JSON.stringify({
        formName: "RA Animatsii — сайт",
        contactName: name,
        email: isEmail ? [contact] : undefined,
        phone: isEmail ? undefined : [contact],
        comment: [message, format ? `Формат: ${format}` : null]
          .filter(Boolean)
          .join("\n"),
        source: "ra-animatsii.vercel.app",
      }),
    });

    if (!salesDriveRes.ok) {
      const text = await salesDriveRes.text();
      console.error("SalesDrive API error:", salesDriveRes.status, text);
      // Заявку все одно вважаємо прийнятою на боці сайту —
      // людина не повинна страждати через збій інтеграції.
      return NextResponse.json({ ok: true, crm: false });
    }

    return NextResponse.json({ ok: true, crm: true });
  } catch (err) {
    console.error("SalesDrive request failed:", err);
    return NextResponse.json({ ok: true, crm: false });
  }
}
