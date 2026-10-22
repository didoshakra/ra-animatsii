// src/app/[lng]/services/page.jsx
import { getT } from "next-i18next/server"
import PageShell from "@/components/PageShell"
import ServiceCard from "@/components/ServiceCard"
import { getContent } from "@/lib/content"
import { getFormatCards } from "@/lib/formatCards"
import { pageMetadata } from "@/lib/seo"

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
  const cards = await getFormatCards(lng)
  const durationLabel = t("pricing.durationLabel")

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

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {cards.map((f) => (
          <ServiceCard
            key={f.id}
            title={f.title}
            duration={f.duration}
            executionTime={f.executionTime}
            durationLabel={durationLabel}
            price={f.price}
            desc={f.desc}
            videoUrl={f.VIDEO_URL}
            posterUrl={f.POSTER_URL}
            runtime={f.runtime}
            color={f.color}
            aspect={f.aspect}
            href={f.detailsHref}
            moreLabel={c.moreLabel}
          />
        ))}
      </div>
    </PageShell>
  )
}
