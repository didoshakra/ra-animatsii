// src/components/Portfolio.jsx
import VideoCard from "./VideoCard"
import ExecutionOptions from "./ExecutionOptions"
import Price from "./Price"
import { getT } from "next-i18next/server"
import { getCloudinaryPoster, getCloudinaryUploadDate, secondsToIsoDuration } from "@/lib/cloudinaryVideo"
import { siteUrl } from "@/lib/site"
import { videosFrom, formatRuntime } from "@/lib/videos"
import ukCommon from "../../public/locales/uk/common.json"
import { FORMATS } from "@/lib/pages"
import { localizedPath } from "@/lib/seo"

const FORMAT_COLORS = {
  short: "bg-sky-light",
  ad: "bg-sun-light",
  brand: "bg-meadow-light",
  story: "bg-sky-light",
}

// Зв'язуємо чотири типи з наявними тарифами.
// Story використовує стартову ціну та термін преміумпакета.
const FORMAT_TIERS = {
  short: "base",
  ad: "standard",
  brand: "premium",
  story: "premium",
}

export default async function Portfolio() {
  const { t, i18n } = await getT("common")
  const lng = i18n?.language === "en" ? "en" : "uk"

  const formatsText = t("portfolio.formats", { returnObjects: true })
  const voiceoverOptions = t("portfolio.voiceoverOptions", { returnObjects: true })
  const styleOptions = t("portfolio.styleOptions", { returnObjects: true })
  const aspectOptions = t("portfolio.aspectOptions", { returnObjects: true })

  const accordionHint = t("portfolio.accordionHint")
  const tiersText = t("pricing.tiers", { returnObjects: true })
  const popularBadge = t("pricing.popularBadge")
  const durationLabel = t("pricing.durationLabel")
  const priceFrom = t("pricing.from")
  const priceCurrency = t("pricing.currency")
  const promoUntil = t("promo.until")

  const ukFormats = ukCommon.portfolio.formats

  const formats = videosFrom("formats").map((v) => {
    const text = formatsText[v.key] || {}
    const videoUrl = text.videoUrl || ukFormats[v.key]?.videoUrl || ""
    const tierId = FORMAT_TIERS[v.key]
    const tier = tiersText[tierId] || {}

    const format = FORMATS.find((item) => item.key === v.key)

    return {
      ...v,
      ...text,
      color: FORMAT_COLORS[v.key],
      VIDEO_URL: videoUrl,
      POSTER_URL: getCloudinaryPoster(videoUrl),
      price: <Price prices={format?.price} from={priceFrom} currency={priceCurrency} until={promoUntil} lng={lng} />,
      executionTime: tier.days || "",
      packageLabel: v.key === "story" ? t("portfolio.storyPackageLabel") : tier.name || "",
      isPopular: v.key === "ad",
      ctaLabel: t("portfolio.formatCta", {
        format: text.label || text.title || "",
      }),
      ctaFormatId: format?.formId ?? null,
      ctaSource: `format:${v.key}`,
      detailsHref: format ? localizedPath(lng, `/services/${format.slug}`) : null,
    }
  })

  const videoSchemas = formats.map((f) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: f.title,
    description: f.desc,
    thumbnailUrl: [f.POSTER_URL],
    uploadDate: getCloudinaryUploadDate(f.VIDEO_URL),
    duration: secondsToIsoDuration(f.durationSeconds),
    contentUrl: f.VIDEO_URL,
    embedUrl: `${siteUrl}/#portfolio`,
    publisher: { "@id": `${siteUrl}/#organization` },
  }))

  return (
    <section id="portfolio" className="bg-meadow pb-10 sm:pb-12">
      {videoSchemas.map((schema, i) => (
        <script
          key={formats[i].id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      <div className="bg-meadow-light py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="font-body font-bold text-sm uppercase tracking-wider text-meadow-deep">
              {t("portfolio.eyebrow")}
            </p>

            <h2 className="mt-2 font-display font-extrabold text-ink text-3xl sm:text-4xl leading-tight">
              {t("portfolio.formatsHeading")}
            </h2>

            <p className="mt-4 font-body text-ink/80 text-base sm:text-lg leading-relaxed">
              {t("portfolio.formatsSubheading")}
            </p>
          </div>

          {/* Об'єднана секція типів і тарифів */}
          <div
            id="pricing"
            className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch scroll-mt-24"
          >
            {formats.map((f) => (
              <VideoCard
                key={f.id}
                title={f.title}
                desc={f.desc}
                structure={f.structure}
                suitableFor={f.suitableFor}
                videoUrl={f.VIDEO_URL}
                posterUrl={f.POSTER_URL}
                duration={f.duration}
                runtime={formatRuntime(f.durationSeconds)}
                color={f.color}
                aspect={f.aspect}
                ctaFormatId={f.ctaFormatId}
                ctaSource={f.ctaSource}
                price={f.price}
                executionTime={f.executionTime}
                durationLabel={durationLabel}
                packageLabel={f.packageLabel}
                popularBadge={f.isPopular ? popularBadge : ""}
                ctaLabel={f.ctaLabel}
                detailsHref={f.detailsHref}
                detailsLabel={t("portfolio.detailsCta")}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href={localizedPath(lng, "/services")}
              className="inline-flex items-center gap-2 rounded-full border-2 border-meadow-deep px-6 py-3 font-body text-sm font-bold text-meadow-deep transition-colors hover:bg-meadow-deep hover:text-cream focus-ring"
            >
              {t("portfolio.allServices")} <span aria-hidden="true">→</span>
            </a>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink/65">{t("portfolio.priceNote")}</p>
        </div>
      </div>

      {/* Варіанти виконання залишаються окремою секцією */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-10">
        <div className="grid lg:grid-cols-[0.8fr_1.6fr] gap-6 lg:gap-10 items-start">
          <div>
            <p className="font-body font-bold text-sm uppercase tracking-wider text-cream/90">
              {t("portfolio.executionEyebrow")}
            </p>

            <h3 className="mt-2 font-display font-bold text-cream text-2xl sm:text-3xl leading-tight">
              {t("portfolio.executionHeading")}
            </h3>

            <p className="mt-3 font-body text-cream/75 leading-relaxed">{t("portfolio.executionDescription")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <ExecutionOptions
              title={t("portfolio.voiceoverGroupTitle")}
              options={voiceoverOptions}
              hint={accordionHint}
            />
            <ExecutionOptions title={t("portfolio.styleGroupTitle")} options={styleOptions} hint={accordionHint} />
            <ExecutionOptions title={t("portfolio.aspectGroupTitle")} options={aspectOptions} hint={accordionHint} />
          </div>
        </div>
      </div>
    </section>
  )
}
