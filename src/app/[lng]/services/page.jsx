// src/app/[lng]/services/page.jsx
import { getT } from "next-i18next/server"
import PageShell from "@/components/PageShell"
import Price from "@/components/Price"
import { getContent } from "@/lib/content"
import { FORMATS } from "@/lib/pages"
import { localizedPath, pageMetadata } from "@/lib/seo"

export async function generateMetadata({ params }) {
  const { lng } = await params
  const c = getContent(lng)
  return pageMetadata({
    lng,
    path: "/services",
    title: c.services.metaTitle,
    description: c.services.metaDescription,
  })
}

export default async function ServicesPage({ params }) {
  const { lng } = await params
  const c = getContent(lng)
  const { t } = await getT("common")

  const priceFrom = t("pricing.from")
  const priceCurrency = t("pricing.currency")
  const promoUntil = t("promo.until")

  const crumbs = [
    { label: c.crumbs.home, path: "" },
    { label: c.crumbs.services, path: "/services" },
  ]

  return (
    <PageShell lng={lng} crumbs={crumbs}>
      <div className="max-w-3xl">
        <h1 className="font-display font-extrabold text-cream text-2xl sm:text-4xl leading-tight">{c.services.h1}</h1>
        <p className="mt-3 font-body text-cream/90 text-lg leading-relaxed">{c.services.intro}</p>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FORMATS.map((f) => {
          const text = t(`portfolio.formats.${f.key}`, { returnObjects: true })
          return (
            <a
              key={f.slug}
              href={localizedPath(lng, `/services/${f.slug}`)}
              className="group bg-cream rounded-3xl p-5 flex flex-col shadow-[0_6px_0_0_theme(colors.meadow.deep)] hover:-translate-y-0.5 transition-transform focus-ring"
            >
              <h2 className="font-display font-bold text-lg text-ink leading-snug">{text.title}</h2>
              <p className="mt-1 font-body text-sm text-clay-deep font-bold">{text.duration}</p>
              <Price
                prices={f.price}
                from={priceFrom}
                currency={priceCurrency}
                until={promoUntil}
                lng={lng}
                className="mt-3"
              />
              <p className="mt-3 font-body text-base text-ink/80 leading-relaxed line-clamp-3">{text.desc}</p>
              <span className="mt-auto pt-4">
                <span className="flex w-full items-center justify-center rounded-full bg-meadow text-cream font-body font-bold text-sm px-4 py-2.5 group-hover:bg-meadow-deep transition-colors">
                  {c.moreLabel} →
                </span>
              </span>
            </a>
          )
        })}
      </div>
    </PageShell>
  )
}
