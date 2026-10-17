// src/lib/contact.js/одна перевірка для сайту й сервера
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const TG_USER_RE = /^@[A-Za-z0-9_]{5,32}$/
const TG_LINK_RE = /^(?:https?:\/\/)?(?:www\.)?t\.me\/([A-Za-z0-9_]{5,32})\/?$/i
const PHONE_RE = /^\+?\d{8,15}$/

// Визначає тип контакту: email, @нік у Telegram (або t.me/нік) чи телефон.
// Повертає { type, value } або null, якщо формат не розпізнано.
export function parseContact(raw) {
  const value = String(raw ?? "").trim()
  if (!value) return null

  if (EMAIL_RE.test(value)) return { type: "email", value }
  if (TG_USER_RE.test(value)) return { type: "telegram", value }

  const link = value.match(TG_LINK_RE)
  if (link) return { type: "telegram", value: `@${link[1]}` }

  const digits = value.replace(/[\s\-().]/g, "")
  if (PHONE_RE.test(digits)) return { type: "phone", value }

  return null
}
