//GP20261020// src/components/Hero.jsx
import Image from "next/image"
import { getT } from "next-i18next/server"
import PromoNote from "./PromoNote"

export default async function Hero() {
  const { t } = await getT("common")
  const perks = t("hero.perks", { returnObjects: true })

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#211C19] text-cream"
    >
      {/* Тепле кінематографічне світло */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-clay/15 blur-[100px] sm:h-[560px] sm:w-[560px]" />
        <div className="absolute -bottom-48 left-[15%] h-[360px] w-[360px] rounded-full bg-sun/5 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#211C19] via-[#211C19]/95 to-[#211C19]/65" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pb-12 pt-8 sm:px-8 sm:pb-20 sm:pt-12 md:grid-cols-[1.05fr_0.95fr] md:gap-8 lg:gap-14 lg:py-20">
        {/* Текстова частина */}
        <div className="relative z-10">
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#D9A879] sm:text-sm">
            RA Spark · AI Video Studio
          </p>

          <h1 className="max-w-2xl font-display text-[2.65rem] font-normal leading-[1.08] tracking-tight text-cream sm:text-5xl lg:text-[4.25rem]">
            {t("hero.titleLine1")}
            <br />
            <span className="text-[#E5B783]">
              {t("hero.titleLine2")}
            </span>
          </h1>

          <p className="mt-5 max-w-xl font-body text-base leading-7 text-cream/75 sm:mt-6 sm:text-lg sm:leading-8">
            {t("hero.description")}
          </p>

          {/* Основні дії */}
          <div className="mt-7 flex flex-col gap-3 xs:flex-row sm:mt-8 sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#B96F45] px-6 py-3 font-body text-sm font-bold text-white transition-colors hover:bg-[#A75D35] focus-ring sm:px-7 sm:text-base"
            >
              {t("hero.ctaPrimary")}
              <span aria-hidden="true" className="ml-2 text-lg">→</span>
            </a>

            <a
              href="#portfolio"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-cream/25 px-6 py-3 font-body text-sm font-semibold text-cream transition-colors hover:border-[#E5B783]/70 hover:bg-cream/5 focus-ring sm:px-7 sm:text-base"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>

          {/* Переваги */}
          {Array.isArray(perks) && perks.length > 0 && (
            <ul className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-2.5 font-body text-sm text-cream/70"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#D9A879]/60 text-[11px] text-[#E5B783]"
                  >
                    ✓
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6">
            <PromoNote />
          </div>

          <p className="mt-5 hidden max-w-lg font-body text-sm leading-relaxed text-cream/45 sm:block">
            {t("hero.footnote")}
          </p>
        </div>

        {/* Фірмовий орел */}
        <div className="relative order-first flex justify-center md:order-last md:justify-end">
          <div className="relative aspect-square w-[156px] sm:w-[230px] md:w-full md:max-w-[430px] lg:max-w-[490px]">
            {/* М'яке світіння замість декоративної плями */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C97A4A]/20 blur-[55px] sm:blur-[75px]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-[10%] rounded-full border border-[#E5B783]/10"
            />

            <div
              aria-hidden="true"
              className="absolute inset-[17%] rounded-full border border-cream/[0.06]"
            />

            <Image
              src="/brand/RASpark_eagle.png"
              alt={t("hero.eagleAlt")}
              fill
              priority
              sizes="(max-width: 640px) 156px, (max-width: 768px) 230px, (max-width: 1280px) 430px, 490px"
              className="relative z-10 object-contain drop-shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </div>

      {/* Тонка межа між Hero і наступною секцією */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D9A879]/30 to-transparent"
      />
    </section>
  )
}

