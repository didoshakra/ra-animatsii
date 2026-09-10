// Header.jsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { useT } from "next-i18next/client"
import LanguageSwitcher from "./LanguageSwitcher"

export default function Header() {
  const [open, setOpen] = useState(false)
  const { t } = useT("common")

  const links = [
    { href: "#portfolio", label: t("header.nav.portfolio") },
    { href: "#process", label: t("header.nav.process") },
    { href: "#pricing", label: t("header.nav.pricing") },
    { href: "#contact", label: t("header.nav.contact") },
  ]

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-sm border-b border-clay/15">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[64px] sm:h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 focus-ring" onClick={() => setOpen(false)}>
          <Image
            src="/brand/eagle.png"
            alt={t("header.brand")}
            width={40}
            height={40}
            className="rounded-full w-9 h-9 sm:w-11 sm:h-11"
            priority
          />
          <span className="font-display font-700 text-lg sm:text-xl text-ink tracking-tight">{t("header.brand")}</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body font-800 text-base sm:text-lg text-ink hover:text-clay-deep transition-colors focus-ring"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <a
            href="#contact"
            className="hidden sm:inline-block font-display font-600 text-sm sm:text-base bg-clay text-cream px-4 sm:px-5 py-2.5 rounded-full hover:bg-clay-deep transition-colors focus-ring shadow-[0_3px_0_0_theme(colors.clay.deep)] active:translate-y-[2px] active:shadow-none"
          >
            {t("header.cta")}
          </a>

          <button
            type="button"
            aria-label={open ? t("header.menuClose") : t("header.menuOpen")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] focus-ring rounded-lg"
          >
            <span
              className={`block w-6 h-[3px] bg-ink rounded-full transition-transform ${
                open ? "translate-y-[8px] rotate-45" : ""
              }`}
            />
            <span className={`block w-6 h-[3px] bg-ink rounded-full transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`block w-6 h-[3px] bg-ink rounded-full transition-transform ${
                open ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-clay/15 bg-cream px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body font-700 text-ink/85 py-2.5 focus-ring"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 text-center font-display font-600 bg-clay text-cream px-5 py-3 rounded-full focus-ring"
          >
            {t("header.cta")}
          </a>
        </div>
      )}
    </header>
  )
}
