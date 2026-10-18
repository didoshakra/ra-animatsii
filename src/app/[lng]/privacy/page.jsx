// src/app/[lng]/privacy/page.jsx
import PageShell from "@/components/PageShell"
import { getPrivacy } from "@/lib/privacy"
import { pageMetadata } from "@/lib/seo"

export async function generateMetadata({ params }) {
  const { lng } = await params
  const p = getPrivacy(lng)
  return pageMetadata({ lng, path: "/privacy", title: p.metaTitle, description: p.metaDescription })
}

export default async function PrivacyPage({ params }) {
  const { lng } = await params
  const p = getPrivacy(lng)
  const crumbs = [
    { label: p.crumbHome, path: "" },
    { label: p.crumb, path: "/privacy" },
  ]

  return (
    <PageShell lng={lng} crumbs={crumbs}>
      <div className="max-w-3xl">
        <h1 className="font-display font-800 text-cream text-2xl sm:text-4xl leading-tight">{p.h1}</h1>
        <p className="mt-2 font-body text-cream/70 text-sm">
          {p.updatedLabel}: {p.updated}
        </p>
        {p.sections.map((s) => (
          <section key={s.h} className="mt-6">
            <h2 className="font-display font-700 text-cream text-xl">{s.h}</h2>
            {s.p.map((text) => (
              <p key={text} className="mt-2 font-body text-cream/90 text-base leading-relaxed">
                {text}
              </p>
            ))}
          </section>
        ))}
      </div>
    </PageShell>
  )
}
