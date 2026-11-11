// src/lib/promo.js
// Після 31 грудня 2026 поставте PROMO_ACTIVE = false, і знижка зникне скрізь.
// Автоматично за датою нічого не вимикається.
export const PROMO_ACTIVE = true
export const PROMO_PERCENT = 25

// amount — базова ціна (число або рядок з common.json), roundTo — крок округлення з common.json.
// Повертає { old, current, percent }. Без акції old = null. Код нічого не знає про мови.
export function getPrice(amount, roundTo = 1) {
  const base = Number(amount)
  if (!Number.isFinite(base) || base <= 0) return { old: null, current: null, percent: 0 }
  if (!PROMO_ACTIVE) return { old: null, current: base, percent: 0 }

  const step = Number(roundTo) > 0 ? Number(roundTo) : 1
  const raw = (base * (100 - PROMO_PERCENT)) / 100
  const current = Math.round(raw / step) * step
  return { old: base, current, percent: PROMO_PERCENT }
}
