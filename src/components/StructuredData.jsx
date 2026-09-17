// src/components/StructuredData.jsx
import { getT } from "next-i18next/server"

const siteUrl = "https://raspark.com"

// Витягує перше число з тексту ціни ("від 4 000 грн" -> "4000").
// Повертає null, якщо чисел немає (напр. "За запитом").
function extractPriceDigits(priceText) {
  const digits = String(priceText || "").replace(/[^\d]/g, "")
  return digits.length > 0 ? digits : null
}

const TIER_IDS = ["base", "standard", "premium", "custom"]

export default async function StructuredData() {
  const { t } = await getT("common")
  const tiersText = t("pricing.tiers", { returnObjects: true })

  const organizationSchema = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "RASpark",
    url: siteUrl,
    logo: `${siteUrl}/brand/RASpark_eagle.png`,
    email: "raspark1954@gmail.com",
    telephone: "+380503739048",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kalush",
      addressRegion: "Ivano-Frankivsk",
      addressCountry: "UA",
    },
    sameAs: ["https://www.youtube.com/@RASparksAI", "https://www.instagram.com/rasparksai"],
  }

  const offers = TIER_IDS.map((id) => {
    const tier = tiersText[id]
    if (!tier) return null

    const priceDigits = extractPriceDigits(tier.price)

    const offer = {
      "@type": "Offer",
      name: tier.name,
      description: tier.tagline,
      url: `${siteUrl}/#pricing`,
    }

    if (priceDigits) {
      offer.priceSpecification = {
        "@type": "UnitPriceSpecification",
        price: priceDigits,
        priceCurrency: "UAH",
        minPrice: priceDigits,
      }
    }

    return offer
  }).filter(Boolean)

  const serviceSchema = {
    "@type": "Service",
    "@id": `${siteUrl}/#service`,
    name: t("structuredData.serviceName"),
    serviceType: t("structuredData.serviceType"),
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "UA",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t("structuredData.offerCatalogName"),
      itemListElement: offers,
    },
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, serviceSchema],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
