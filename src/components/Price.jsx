// src/components/Price.jsx
// Серверний компонент: його можна передавати як проп у клієнтські компоненти.
// Приймає tier ("base" | "standard" | "premium" | "custom"), className, dark (темний фон), large (більший шрифт).
// Усе мовно-залежне (число, "від", валюта, порядок, округлення, роздільник тисяч) бере з common.json.
import { getT } from "next-i18next/server"
import { getPrice } from "@/lib/promo"

export default async function Price({ tier, className = "", dark = false, large = false }) {
  const { t } = await getT("common")

  const raw = t(`pricing.tiers.${tier}.price`)
  const amount = Number(String(raw).replace(/\s/g, ""))
  const size = large ? "text-3xl" : "text-2xl"

  // Не число (наприклад, "За запитом") — показуємо текст як є, без знижки.
  if (!Number.isFinite(amount) || amount <= 0) {
    return (
      <div className={className}>
        <p className={`font-display ${size} font-extrabold leading-tight ${dark ? "text-cream" : "text-ink"}`}>{raw}</p>
      </div>
    )
  }

  const from = t("pricing.from")
  const currency = t("pricing.currency")
  const roundTo = t("pricing.roundTo")
  const numberLocale = t("pricing.numberLocale")
  const until = t("promo.until")

  const { old, current, percent } = getPrice(amount, roundTo)
  if (current == null) return null
  
  console.log("numberLocale:", numberLocale)

  const fmt = (n) => new Intl.NumberFormat(numberLocale).format(n)
  const money = (n) =>
    t("pricing.priceFormat", { from, currency, amount: fmt(n), interpolation: { escapeValue: false } })

  const mainColor = dark ? "text-cream" : old ? "text-clay-deep" : "text-ink"

  return (
    <div className={className}>
      {old && (
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-body text-sm line-through ${dark ? "text-cream/60" : "text-ink/50"}`}>
            {money(old)}
          </span>
          <span className="rounded-full bg-sun px-2 py-0.5 text-xs font-bold text-ink">-{percent}%</span>
        </div>
      )}
      <p className={`font-display ${size} font-extrabold leading-tight ${mainColor}`}>{money(current)}</p>
      {old && until && <p className={`mt-0.5 text-xs ${dark ? "text-cream/70" : "text-ink/60"}`}>{until}</p>}
    </div>
  )
}
