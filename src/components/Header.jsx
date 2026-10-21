//GP20261020// components/Header.jsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { useT } from "next-i18next/client"
import LanguageSwitcher from "./LanguageSwitcher"

export default function Header() {
  const [open, setOpen] = useState(false)
  const { t, i18n } = useT("common")

  const base = i18n.language === "en" ? "/en" : ""
  const home = base || "/"

  const links = [
    { href: `${base}/services`, label: t("header.nav.services") },
    { href: `${base}/examples`, label: t("header.nav.case") },
    { href: `${home}#process`, label: t("header.nav.process") },
    { href: `${home}#contact`, label: t("header.nav.contact") },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-ink/95 text-cream backdrop-blur-md">
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-5 sm:h-[72px] sm:px-8">
        <a
          href={home}
          className="flex shrink-0 items-center gap-2.5 focus-ring"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/RASpark_eagle.png"
            alt={t("header.brand")}
            width={44}
            height={44}
            sizes="(max-width: 640px) 36px, 44px"
            className="h-9 w-9 object-contain sm:h-11 sm:w-11"
            priority
          />
          <span className="font-display text-lg tracking-tight text-cream sm:text-xl">
            {t("header.brand")}
          </span>
        </a>

        <nav className="ml-6 hidden items-center gap-3 md:flex lg:gap-5 xl:gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-body text-sm font-medium text-cream/80 transition-colors hover:text-sun focus-ring lg:text-[15px]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitcher />

          <a
            href={`${home}#contact`}
            className="hidden whitespace-nowrap rounded-full border border-clay/70 bg-clay px-4 py-2 font-body text-sm font-semibold text-cream transition-colors hover:border-clay hover:bg-clay-deep focus-ring xl:inline-block"
          >
            {t("header.cta")}
          </a>

          <button
            type="button"
            aria-label={open ? t("header.menuClose") : t("header.menuOpen")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg focus-ring md:hidden"
          >
            <span
              className={`block h-[2px] w-6 rounded-full bg-cream transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 rounded-full bg-cream transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 rounded-full bg-cream transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="border-t border-cream/10 bg-ink px-5 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg py-3 font-body text-[15px] font-medium text-cream/85 transition-colors hover:bg-cream/5 hover:text-sun focus-ring"
              >
                {link.label}
              </a>
            ))}

            <a
              href={`${home}#contact`}
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-clay px-5 py-3 text-center font-body text-sm font-semibold text-cream transition-colors hover:bg-clay-deep focus-ring"
            >
              {t("header.cta")}
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
