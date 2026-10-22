// src/lib/formatCards.jsx
// Єдине місце, де збираються дані чотирьох карток послуг (відео, ціна зі знижкою, посилання).
// Використовують Portfolio.jsx (головна) і services/page.jsx.
import { getT } from "next-i18next/server"
import Price from "@/components/Price"
import { getCloudinaryPoster } from "@/lib/cloudinaryVideo"
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

// Story використовує термін преміумпакета.
const FORMAT_TIERS = {
  short: "base",
  ad: "standard",
  brand: "premium",
  story: "premium",
}

export async function getFormatCards(lng) {
  const { t } = await getT("common")

  const formatsText = t("portfolio.formats", { returnObjects: true })
  const tiersText = t("pricing.tiers", { returnObjects: true })
  const priceFrom = t("pricing.from")
  const priceCurrency = t("pricing.currency")
  const promoUntil = t("promo.until")
  const ukFormats = ukCommon.portfolio.formats

  return videosFrom("formats").map((v) => {
    const text = formatsText[v.key] || {}
    const videoUrl = text.videoUrl || ukFormats[v.key]?.videoUrl || ""
    const tier = tiersText[FORMAT_TIERS[v.key]] || {}
    const format = FORMATS.find((item) => item.key === v.key)

    return {
      ...v,
      ...text,
      color: FORMAT_COLORS[v.key],
      VIDEO_URL: videoUrl,
      POSTER_URL: getCloudinaryPoster(videoUrl),
      runtime: formatRuntime(v.durationSeconds),
      price: <Price prices={format?.price} from={priceFrom} currency={priceCurrency} until={promoUntil} lng={lng} />,
      executionTime: tier.days || "",
      packageLabel: v.key === "story" ? t("portfolio.storyPackageLabel") : tier.name || "",
      isPopular: v.key === "ad",
      ctaLabel: t("portfolio.formatCta", { format: text.label || text.title || "" }),
      ctaFormatId: format?.formId ?? null,
      ctaSource: `format:${v.key}`,
      detailsHref: format ? localizedPath(lng, `/services/${format.slug}`) : null,
    }
  })
}
