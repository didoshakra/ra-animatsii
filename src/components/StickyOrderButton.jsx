// src/components/StickyOrderButton.jsx
"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useT } from "next-i18next/client"
import PricingCta from "./PricingCta"

// Липка кнопка «Замовити» лише на мобільному.
// Ховається в адмінці та поки форма #contact видна на екрані.
export default function StickyOrderButton() {
  const { t } = useT("common")
  const pathname = usePathname() || ""
  const [formVisible, setFormVisible] = useState(false)

  const cleanPath = pathname.replace(/^\/en(?=\/|$)/, "")
  const isHidden = cleanPath.startsWith("/admin") || cleanPath.startsWith("/exclude-me")

  useEffect(() => {
    if (isHidden) return
    const target = document.getElementById("contact")
    if (!target) {
      setFormVisible(false)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
      threshold: 0.1,
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [pathname, isHidden])

  if (isHidden) return null

  return (
    <>
      {/* Відступ, щоб смуга не перекривала низ футера */}
      <div aria-hidden="true" className="h-20 bg-ink sm:hidden" />
      <div
        className={`fixed inset-x-0 bottom-0 z-40 sm:hidden px-4 pt-3 bg-gradient-to-t from-ink/90 to-transparent transition-transform duration-200 ${
          formVisible ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <PricingCta
          source="sticky"
          className="flex w-full items-center justify-center rounded-full bg-sun text-ink font-display font-700 text-base py-3 shadow-[0_4px_0_0_theme(colors.clay.deep)] active:translate-y-[3px] active:shadow-none focus-ring"
        >
          {t("stickyCta.label")}
        </PricingCta>
      </div>
    </>
  )
}
