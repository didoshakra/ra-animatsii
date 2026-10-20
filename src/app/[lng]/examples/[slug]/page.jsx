// src/app/[lng]/examples/[slug]/page.jsx
import { notFound } from "next/navigation"
import PageShell from "@/components/PageShell"
import VideoGrid from "@/components/VideoGrid"
import { getContent } from "@/lib/content"
import { localizedPath, pageMetadata } from "@/lib/seo"
import { VIDEOS } from "@/lib/videos"
import { resolveVideos } from "@/lib/videoData"
import PricingCta from "@/components/PricingCta"
import { FORMATS, NICHES } from "@/lib/pages"   // замість імпорту лише NICHES

function findNiche(slug, c) {
  const niche = NICHES.find((n) => n.slug === slug && n.page)
  return niche && c.niches[slug] ? niche : null
}

export function generateStaticParams() {
  return NICHES.filter((n) => n.page).map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }) {
  const { lng, slug } = await params
  const c = getContent(lng)
  if (!findNiche(slug, c)) return {}
  const page = c.niches[slug]
  return pageMetadata({
    lng,
    path: `/examples/${slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
  })
}

export default async function NichePage({ params }) {
  const { lng, slug } = await params
  const c = getContent(lng)
  if (!findNiche(slug, c)) notFound()

  const page = c.niches[slug]
  const videos = await resolveVideos(
    VIDEOS.filter((v) => v.niche === slug),
    lng,
  )
  const formId = FORMATS.find((f) => f.key === videos[0]?.format)?.formId ?? null
  const others = NICHES.filter((n) => n.page && n.slug !== slug && c.niches[n.slug])

  const crumbs = [
    { label: c.crumbs.home, path: "" },
    { label: c.crumbs.examples, path: "/examples" },
    { label: page.name, path: `/examples/${slug}` },
  ]

  return (
    <PageShell lng={lng} crumbs={crumbs}>
      <div className="max-w-2xl">
        <h1 className="font-display font-800 text-cream text-3xl sm:text-4xl leading-tight">{page.h1}</h1>
        <p className="mt-4 font-body text-cream/90 text-xl leading-relaxed">{page.lead}</p>
        <p className="mt-3 font-body text-cream/90 text-base antialiased">{c.demoNote}</p>
        <PricingCta
          formatId={formId}
          source={`example:${slug}`}
          className="mt-6 inline-block font-display font-600 text-base bg-clay text-cream px-6 py-3 rounded-full hover:bg-clay-deep transition-colors focus-ring shadow-[0_3px_0_0_theme(colors.clay.deep)] active:translate-y-[2px] active:shadow-none"
        >
          {c.orderCta}
        </PricingCta>
      </div>

      <VideoGrid videos={videos} badge={c.exampleBadge} />

      <h2 className="mt-8 font-display font-bold text-cream text-2xl antialiased">{c.examples.byNiche}</h2>
      <ul className="mt-4 flex flex-wrap gap-3">
        {others.map((n) => (
          <li key={n.slug}>
            <a
              href={localizedPath(lng, `/examples/${n.slug}`)}
              className="inline-block bg-cream text-ink font-body font-700 px-4 py-2 rounded-full hover:bg-sun-light transition-colors focus-ring"
            >
              {c.niches[n.slug].name}
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
