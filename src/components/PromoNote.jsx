// src/components/PromoNote.jsx
import { getT } from "next-i18next/server"
import { PROMO_ACTIVE, PROMO_PERCENT } from "@/lib/promo"

// Усі стилі знижки в одному місці: змінюйте DEFAULT_CLASS або передайте className.
const DEFAULT_CLASS = "inline-block bg-sun text-ink font-body font-700 text-sm sm:text-base px-4 py-1.5 rounded-full"

export default async function PromoNote({ className = DEFAULT_CLASS }) {
  if (!PROMO_ACTIVE) return null
  const { t } = await getT("common")
  return <p className={className}>{t("promo.text", { percent: PROMO_PERCENT })}</p>
}
