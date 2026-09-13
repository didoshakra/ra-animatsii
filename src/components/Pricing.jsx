// Pricing.jsx
import { ManicureIllustration, CafeIllustration, OfficeIllustration, CustomIllustration } from "./PricingIcons"
import { getT } from "next-i18next/server"

// Структурна конфігурація тарифів (ілюстрація, підсвітка, формат для автопідсвічування
// у формі контактів) — не текст, тому лишається поза перекладами.
const TIER_CONFIG = [
  { id: "base", Illustration: ManicureIllustration, highlight: false, formatId: "short" },
  { id: "standard", Illustration: CafeIllustration, highlight: true, formatId: "ad" },
  { id: "premium", Illustration: OfficeIllustration, highlight: false, formatId: "brand" },
  { id: "custom", Illustration: CustomIllustration, highlight: false, formatId: "story" },
]

export default async function Pricing() {
  const { t } = await getT("common")
  const tiersText = t("pricing.tiers", { returnObjects: true })
  const popularBadge = t("pricing.popularBadge")
  const durationLabel = t("pricing.durationLabel")
  const ctaButton = t("pricing.ctaButton")

  const tiers = TIER_CONFIG.map((cfg) => ({
    ...cfg,
    ...tiersText[cfg.id],
  }))

  return (
    <section id="pricing" className="bg-cream py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <h2 className="font-display font-800 text-ink text-3xl sm:text-4xl leading-tight">{t("pricing.heading")}</h2>
          <p className="mt-4 font-body text-ink/70 text-xl leading-relaxed">{t("pricing.subheading")}</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {tiers.map((tier) => {
            const href = tier.formatId ? `/?format=${tier.formatId}#contact` : "#contact"
            return (
              <div
                key={tier.id}
                className={`rounded-3xl overflow-hidden flex flex-col shadow-[0_6px_0_0_theme(colors.meadow.deep)] ${
                  tier.highlight ? "bg-ink text-cream ring-2 ring-sun" : "bg-white text-ink"
                }`}
              >
                <div className="relative h-32 shrink-0">
                  <tier.Illustration />
                  {tier.highlight && (
                    <span className="absolute top-3 left-3 bg-sun text-ink font-body font-700 text-xs px-3 py-1 rounded-full">
                      {popularBadge}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className={`font-display font-700 text-2xl ${tier.highlight ? "text-cream" : "text-ink"}`}>
                    {tier.name}
                  </p>
                  <p className={`font-body text-sm mt-1 ${tier.highlight ? "text-cream/70" : "text-ink/60"}`}>
                    {tier.tagline}
                  </p>
                  <p className={`font-display font-800 text-3xl mt-4 ${tier.highlight ? "text-cream" : "text-ink"}`}>
                    {tier.price}
                  </p>
                  <p
                    className={`font-body text-sm mt-1 font-700 ${tier.highlight ? "text-cream/80" : "text-clay-deep"}`}
                  >
                    {durationLabel} {tier.days}
                  </p>

                  <ul className="mt-5 flex-1 space-y-2">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className={`font-body text-sm leading-relaxed flex gap-2 ${
                          tier.highlight ? "text-cream/90" : "text-ink/75"
                        }`}
                      >
                        <span aria-hidden="true">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={href}
                    className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 font-body font-700 text-sm transition-colors focus-ring ${
                      tier.highlight
                        ? "bg-sun text-ink hover:bg-sun-light"
                        : "bg-meadow text-cream hover:bg-meadow-deep"
                    }`}
                  >
                    {ctaButton}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
