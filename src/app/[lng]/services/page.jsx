// src/app/[lng]/services/page.jsx
import { getT } from "next-i18next/server"
import PageShell from "@/components/PageShell"
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

  const crumbs = [
    { label: c.crumbs.home, path: "" },
    { label: c.crumbs.services, path: "/services" },
  ]

  return (
    <PageShell lng={lng} crumbs={crumbs}>
      <div className="max-w-2xl">
        <h1 className="font-display font-800 text-cream text-3xl sm:text-4xl leading-tight">{c.services.h1}</h1>
        <p className="mt-4 font-body text-cream/90 text-xl leading-relaxed">{c.services.intro}</p>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        {FORMATS.map((f) => {
          const text = t(`portfolio.formats.${f.key}`, { returnObjects: true })
          const tier = t(`pricing.tiers.${f.tier}`, { returnObjects: true })
          return (
            <a
              key={f.slug}
              href={localizedPath(lng, `/services/${f.slug}`)}
              className="bg-cream rounded-3xl p-6 flex flex-col shadow-[0_6px_0_0_theme(colors.meadow.deep)] hover:-translate-y-0.5 transition-transform focus-ring"
            >
              <h2 className="font-display font-700 text-xl text-ink">{text.title}</h2>
              <p className="font-body text-base text-clay-deep font-700 mt-1">{text.duration}</p>
              <p className="font-body text-lg text-ink/70 mt-2 leading-relaxed">{text.desc}</p>
              <p className="font-body text-base text-ink/80 font-700 mt-3">{tier.price}</p>
              <span className="mt-4 font-body font-700 text-meadow-deep">{c.moreLabel} →</span>
            </a>
          )
        })}
      </div>
    </PageShell>
  )
}
