// src/components/StructuredData.jsx
import { getT } from "next-i18next/server"
import { siteUrl, siteName, siteAlternateName } from "@/lib/site"
import { CONTACT_EMAIL } from "@/lib/contacts"

const contactEmail = CONTACT_EMAIL

const TIER_IDS = ["base", "standard", "premium", "custom"]

export default async function StructuredData() {
  const { t } = await getT("common")
  const tiersText = t("pricing.tiers", { returnObjects: true })
  // Код валюти (UAH, USD…) береться з перекладів, а не вгадується за символом.
  const currencyCode = t("pricing.currencyCode")

  const organizationSchema = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: siteAlternateName,
    url: siteUrl,
    logo: `${siteUrl}/brand/RASpark_eagle.png`,
    image: `${siteUrl}/brand/SEO-OG-RASpark.jpg`,
    email: contactEmail,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: contactEmail,
      availableLanguage: ["uk", "en"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kalush",
      postalCode: "77300",
      addressRegion: "Ivano-Frankivsk",
      addressCountry: "UA",
    },
    sameAs: ["https://www.youtube.com/@RASparksAI", "https://www.instagram.com/rasparksai"],
  }

  const offers = TIER_IDS.map((id) => {
    const tier = tiersText[id]
    if (!tier) return null

    // price тепер просто число в рядку ("4000"); для custom це текст — тоді ціну не додаємо.
    const price = String(tier.price || "").replace(/\s/g, "")
    const isNumber = /^\d+(\.\d+)?$/.test(price)

    const offer = {
      "@type": "Offer",
      name: tier.name,
      description: tier.tagline,
      url: `${siteUrl}/#pricing`,
    }

    if (isNumber) {
      // У схему йде базова ціна без знижки.
      offer.priceSpecification = {
        "@type": "UnitPriceSpecification",
        price,
        priceCurrency: currencyCode,
        minPrice: price,
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
    areaServed: [
      { "@type": "Country", name: "Ukraine" },
      { "@type": "Place", name: "Worldwide" },
    ],
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
