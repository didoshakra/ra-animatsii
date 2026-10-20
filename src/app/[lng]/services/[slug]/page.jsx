// src/app/[lng]/services/[slug]/page.jsx
import { notFound } from "next/navigation"
import { getT } from "next-i18next/server"
import PageShell from "@/components/PageShell"
import VideoGrid from "@/components/VideoGrid"
import { getContent } from "@/lib/content"
import { FORMATS } from "@/lib/pages"
import { localizedPath, pageMetadata } from "@/lib/seo"
import { VIDEOS } from "@/lib/videos"
import { resolveVideos } from "@/lib/videoData"
import PricingCta from "@/components/PricingCta"

export function generateStaticParams() {
  return FORMATS.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }) {
  const { lng, slug } = await params
  const fmt = FORMATS.find((f) => f.slug === slug)
  if (!fmt) return {}
  const page = getContent(lng).formats[fmt.key]
  return pageMetadata({
    lng,
    path: `/services/${slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
  })
}

export default async function FormatPage({ params }) {
  const { lng, slug } = await params
  const fmt = FORMATS.find((f) => f.slug === slug)
  if (!fmt) notFound()

  const c = getContent(lng)
  const page = c.formats[fmt.key]
  const { t } = await getT("common")
  const text = t(`portfolio.formats.${fmt.key}`, { returnObjects: true })
  const tier = t(`pricing.tiers.${fmt.tier}`, { returnObjects: true })
  const durationLabel = t("pricing.durationLabel")
  const videos = await resolveVideos(
    VIDEOS.filter((v) => v.format === fmt.key),
    lng,
  )
  const others = FORMATS.filter((f) => f.slug !== slug)

  const crumbs = [
    { label: c.crumbs.home, path: "" },
    { label: c.crumbs.services, path: "/services" },
    { label: page.h1, path: `/services/${slug}` },
  ]

  return (
    <PageShell lng={lng} crumbs={crumbs}>
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-5 md:gap-10 items-start">
        <div>
          <h1 className="font-display font-extrabold text-cream text-2xl sm:text-4xl leading-tight">{page.h1}</h1>
          <p className="mt-3 font-body text-cream/90 text-lg leading-relaxed">{text.desc}</p>
          <p className="mt-3 font-body text-cream/90 text-base leading-relaxed">
            <span className="font-bold text-cream">{text.structure}</span> · {text.suitableFor}
          </p>
        </div>

        <div className="bg-cream rounded-3xl p-5 shadow-[0_6px_0_0_theme(colors.meadow.deep)]">
          <p className="font-display font-extrabold text-ink text-2xl">{tier.price}</p>
          <p className="mt-1 font-body font-bold text-clay-deep text-sm">
            {durationLabel} {tier.days}
          </p>
          <p className="mt-2 font-body text-ink/70 text-xs leading-snug">{c.priceNote}</p>
          <PricingCta
            formatId={fmt.formId}
            source={`service:${slug}`}
            className="mt-4 flex w-full items-center justify-center font-display font-600 text-base bg-clay text-cream px-6 py-3 rounded-full hover:bg-clay-deep transition-colors focus-ring shadow-[0_3px_0_0_theme(colors.clay.deep)] active:translate-y-[2px] active:shadow-none"
          >
            {c.orderCta}
          </PricingCta>
        </div>
      </div>

      <h2 className="mt-8 font-display font-bold text-cream text-xl sm:text-2xl">{c.examplesOfFormat}</h2>
      <p className="mt-1 font-body text-cream/90 text-sm antialiased">{c.demoNote}</p>
      <VideoGrid videos={videos} badge={c.exampleBadge} />

      <h2 className="mt-8 font-display font-bold text-cream text-xl sm:text-2xl">{c.otherFormats}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {others.map((f) => (
          <li key={f.slug}>
            <a
              href={localizedPath(lng, `/services/${f.slug}`)}
              className="inline-block bg-cream text-ink font-body font-bold text-sm px-4 py-2 rounded-full hover:bg-sun-light transition-colors focus-ring"
            >
              {t(`portfolio.formats.${f.key}.label`)}
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
