// src/components/LanguageSwitcher.jsx
"use client"

import { usePathname, useRouter } from "next/navigation"
import { useT } from "next-i18next/client"
import i18nConfig from "../../i18n.config"

const LABELS = { uk: "UA", en: "EN" }

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const { i18n } = useT()
  const { supportedLngs } = i18nConfig
  const currentLng = i18n.language

  const switchLocale = (locale) => {
    const segments = pathname.split("/").filter(Boolean)
    const pathWithoutLocale = supportedLngs.includes(segments[0]) ? segments.slice(1) : segments
    const nextPath =
      locale === i18nConfig.fallbackLng
        ? `/${pathWithoutLocale.join("/")}`
        : `/${locale}/${pathWithoutLocale.join("/")}`

    router.push(nextPath === "/" ? "/" : nextPath.replace(/\/$/, ""))
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Мова сайту">
      {supportedLngs.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => switchLocale(lng)}
          aria-pressed={currentLng === lng}
          className={`font-body font-700 text-sm px-2.5 py-1.5 rounded-full transition-colors focus-ring ${
            currentLng === lng ? "bg-clay text-cream" : "text-ink/60 hover:text-ink"
          }`}
        >
          {LABELS[lng] ?? lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
