// src/lib/promo.js
// Після 31 грудня 2026 поставте PROMO_ACTIVE = false, і знижка зникне скрізь.
export const PROMO_ACTIVE = true
export const PROMO_PERCENT = 25

// base — число для поточної мови. Повертає { old, current, percent }.
// Без акції old = null. Гривня округлюється до 10, долар до цілого.
export function getPrice(base, lng = "uk") {
  if (!PROMO_ACTIVE || !base) return { old: null, current: base, percent: 0 }
  const raw = (base * (100 - PROMO_PERCENT)) / 100
  const current = lng === "en" ? Math.round(raw) : Math.round(raw / 10) * 10
  return { old: base, current, percent: PROMO_PERCENT }
}
