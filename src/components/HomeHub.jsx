// src/components/HomeHub.jsx
import { getT } from "next-i18next/server"
import { getContent } from "@/lib/content"
import { FORMATS, NICHES } from "@/lib/pages"
import { localizedPath } from "@/lib/seo"

const chipCls =
  "inline-block bg-white text-ink font-body font-bold text-sm px-4 py-2 rounded-full hover:bg-sun-light transition-colors focus-ring"

// Блок «для кого» і внутрішні посилання на типи роликів та приклади за сферами
export default async function HomeHub() {
  const { t, i18n } = await getT("common")
  const lng = i18n.language === "en" ? "en" : "uk"
  const c = getContent(lng)
  const niches = NICHES.filter((n) => n.page && c.niches[n.slug])

  return (
    <section id="explore" className="bg-[#F0E8DA] py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-ink text-3xl sm:text-4xl leading-tight">
            {c.home.forWhomHeading}
          </h2>
          <p className="mt-3 font-body text-ink/75 text-lg leading-relaxed">{c.home.forWhomIntro}</p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-display font-bold text-ink text-xl">{c.home.typesHeading}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <li key={f.slug}>
                  <a href={localizedPath(lng, `/services/${f.slug}`)} className={chipCls}>
                    {t(`portfolio.formats.${f.key}.label`)}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={localizedPath(lng, "/services")}
              className="mt-3 inline-block font-body font-bold text-meadow-deep hover:underline underline-offset-4 focus-ring"
            >
              {c.home.allServices} →
            </a>
          </div>

          <div>
            <h3 className="font-display font-bold text-ink text-xl">{c.home.nichesHeading}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {niches.map((n) => (
                <li key={n.slug}>
                  <a href={localizedPath(lng, `/examples/${n.slug}`)} className={chipCls}>
                    {c.niches[n.slug].name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={localizedPath(lng, "/examples")}
              className="mt-3 inline-block font-body font-bold text-meadow-deep hover:underline underline-offset-4 focus-ring"
            >
              {c.home.allExamples} →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
