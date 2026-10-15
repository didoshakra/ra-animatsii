// src/app/[lng]/examples/page.jsx
import PageShell from "@/components/PageShell"
import VideoGrid from "@/components/VideoGrid"
import { getContent } from "@/lib/content"
import { NICHES } from "@/lib/pages"
import { localizedPath, pageMetadata } from "@/lib/seo"
import { VIDEOS } from "@/lib/videos"
import { resolveVideos } from "@/lib/videoData"

export async function generateMetadata({ params }) {
  const { lng } = await params
  const c = getContent(lng)
  return pageMetadata({
    lng,
    path: "/examples",
    title: c.examples.metaTitle,
    description: c.examples.metaDescription,
  })
}

export default async function ExamplesPage({ params }) {
  const { lng } = await params
  const c = getContent(lng)
  const videos = await resolveVideos(VIDEOS, lng)
  const nicheLinks = NICHES.filter((n) => n.page && c.niches[n.slug])

  const crumbs = [
    { label: c.crumbs.home, path: "" },
    { label: c.crumbs.examples, path: "/examples" },
  ]

  return (
    <PageShell lng={lng} crumbs={crumbs}>
      <div className="max-w-2xl">
        <h1 className="font-display font-800 text-cream text-3xl sm:text-4xl leading-tight">{c.examples.h1}</h1>
        <p className="mt-4 font-body text-cream/90 text-xl leading-relaxed">{c.examples.intro}</p>
        <p className="mt-3 font-body text-cream/80 text-base">{c.demoNote}</p>
      </div>

      <h2 className="mt-8 font-display font-700 text-cream text-2xl">{c.examples.byNiche}</h2>
      <ul className="mt-4 flex flex-wrap gap-3">
        {nicheLinks.map((n) => (
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

      <VideoGrid videos={videos} badge={c.exampleBadge} />
    </PageShell>
  )
}
