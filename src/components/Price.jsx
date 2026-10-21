// src/components/Price.jsx
// Серверний компонент без хуків: його можна передавати як проп у клієнтські компоненти.
// prices = { uk: 4000, en: 100 }. UA: «від 4 000 грн», EN: «from $100».
import { getPrice } from "@/lib/promo"

export default function Price({ prices, from, currency, until, lng = "uk", className = "" }) {
  const { old, current, percent } = getPrice(prices?.[lng], lng)
  if (current == null) return null

  const sep = lng === "en" ? "," : "\u00a0"
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep)
  const money = (n) => (lng === "en" ? `${from} ${currency}${fmt(n)}` : `${from} ${fmt(n)} ${currency}`)

  return (
    <div className={className}>
      {old && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-body text-sm text-ink/50 line-through">{money(old)}</span>
          <span className="rounded-full bg-sun px-2 py-0.5 text-xs font-bold text-ink">-{percent}%</span>
        </div>
      )}
      <p className={`font-display text-2xl font-extrabold leading-tight ${old ? "text-clay-deep" : "text-ink"}`}>
        {money(current)}
      </p>
      {old && until && <p className="mt-0.5 text-xs text-ink/60">{until}</p>}
    </div>
  )
}
