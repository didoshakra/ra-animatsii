// components/Pricing.jsx
import { ManicureIllustration, CafeIllustration, OfficeIllustration, CustomIllustration } from "./PricingIcons"
import PricingCta from "./PricingCta"
import { getT } from "next-i18next/server"
import PromoNote from "./PromoNote"

// Структурна конфігурація тарифів (ілюстрація, підсвітка, формат для автопідсвічування
// у формі контактів) — не текст, тому лишається поза перекладами.
// formatId має збігатися з FORMATS у ContactForm.jsx; для індивідуального тарифу формат не підставляємо.
const TIER_CONFIG = [
  { id: "base", Illustration: ManicureIllustration, highlight: false, formatId: "short_advertisement" },
  { id: "standard", Illustration: CafeIllustration, highlight: true, formatId: "commercial" },
  { id: "premium", Illustration: OfficeIllustration, highlight: false, formatId: "brand_card" },
  { id: "custom", Illustration: CustomIllustration, highlight: false, formatId: null },
]

export default async function Pricing() {
  const { t } = await getT("common")
  const tiersText = t("pricing.tiers", { returnObjects: true })
  const popularBadge = t("pricing.popularBadge")
  const durationLabel = t("pricing.durationLabel")
  const formatLabel = t("pricing.formatLabel")
  const ctaButton = t("pricing.ctaButton")

  const tiers = TIER_CONFIG.map((cfg) => ({
    ...cfg,
    ...tiersText[cfg.id],
  }))

  return (
    <section id="pricing" className="bg-cream py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <h2 className="font-display font-extrabold text-ink text-3xl sm:text-4xl leading-tight">
            {t("pricing.heading")}
          </h2>
          <p className="mt-4 font-body text-ink/80 text-xl leading-relaxed">{t("pricing.subheading")}</p>
          <div className="mt-4">
            <PromoNote />
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {tiers.map((tier) => {
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
                    <span className="absolute top-3 left-3 bg-sun text-ink font-body font-bold text-xs px-3 py-1 rounded-full">
                      {popularBadge}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className={`font-display font-bold text-2xl ${tier.highlight ? "text-cream" : "text-ink"}`}>
                    {tier.name}
                  </p>
                  <p className={`font-body text-sm mt-1 ${tier.highlight ? "text-cream/80" : "text-ink/70"}`}>
                    {tier.tagline}
                  </p>
                  <p
                    className={`font-display font-extrabold text-3xl mt-4 ${tier.highlight ? "text-cream" : "text-ink"}`}
                  >
                    {tier.price}
                  </p>
                  <p
                    className={`font-body text-sm mt-1 font-bold ${tier.highlight ? "text-cream/90" : "text-clay-deep"}`}
                  >
                    {durationLabel} {tier.days}
                  </p>
                  {tier.formatId && (
                    <p
                      className={`font-body text-sm mt-1 font-bold ${
                        tier.highlight ? "text-cream/90" : "text-clay-deep"
                      }`}
                    >
                      {formatLabel} {t(`contactForm.formats.${tier.formatId}`)}
                    </p>
                  )}

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

                  <PricingCta
                    formatId={tier.formId ?? tier.formatId}
                    source={`pricing:${tier.id}`}
                    className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 font-body font-bold text-sm transition-colors focus-ring ${
                      tier.highlight
                        ? "bg-sun text-ink hover:bg-sun-light"
                        : "bg-meadow text-cream hover:bg-meadow-deep"
                    }`}
                  >
                    {ctaButton}
                  </PricingCta>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
