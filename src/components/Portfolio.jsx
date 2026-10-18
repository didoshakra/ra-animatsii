// src/components/Portfolio.jsx
import VideoCard from "./VideoCard"
import ExecutionOptions from "./ExecutionOptions"
import { getT } from "next-i18next/server"
import { getCloudinaryPoster, getCloudinaryUploadDate, secondsToIsoDuration } from "@/lib/cloudinaryVideo"
import { siteUrl } from "@/lib/site"
import { videosFrom, formatRuntime } from "@/lib/videos"
import ukCommon from "../../public/locales/uk/common.json"
import { FORMATS } from "@/lib/pages"

// Лише оформлення: колір фону картки формату
const FORMAT_COLORS = {
  short: "bg-sky-light",
  ad: "bg-sun-light",
  brand: "bg-meadow-light",
  story: "bg-sky-light",
}

export default async function Portfolio() {
  const { t } = await getT("common")
  const formatsText = t("portfolio.formats", { returnObjects: true })
  const voiceoverOptions = t("portfolio.voiceoverOptions", { returnObjects: true })
  const styleOptions = t("portfolio.styleOptions", { returnObjects: true })
  const aspectOptions = t("portfolio.aspectOptions", { returnObjects: true })
  const accordionHint = t("portfolio.accordionHint")

  const ukFormats = ukCommon.portfolio.formats

  const formats = videosFrom("formats").map((v) => {
    const text = formatsText[v.key] || {}
    const videoUrl = text.videoUrl || ukFormats[v.key]?.videoUrl || ""
    return {
      ...v,
      ...text,
      color: FORMAT_COLORS[v.key],
      VIDEO_URL: videoUrl,
      POSTER_URL: getCloudinaryPoster(videoUrl),
    }
  })

  const videoSchemas = formats.map((f) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: f.title,
    description: f.desc,
    thumbnailUrl: [f.POSTER_URL],
    uploadDate: getCloudinaryUploadDate(f.VIDEO_URL),
    duration: secondsToIsoDuration(f.durationSeconds),
    contentUrl: f.VIDEO_URL,
    embedUrl: `${siteUrl}/#portfolio`,
    publisher: { "@id": `${siteUrl}/#organization` },
  }))

  return (
    <section id="portfolio" className="bg-meadow pb-10 sm:pb-10">
      {videoSchemas.map((schema, i) => (
        <script
          key={formats[i].id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="bg-meadow-light py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-xl">
            <h2 className="font-display font-800 text-cream text-3xl sm:text-4xl leading-tight">
              {t("portfolio.formatsHeading")}
            </h2>
          </div>

          <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 gap-6 items-start">
            {formats.map((f) => (
              <VideoCard
                key={f.id}
                title={f.title}
                desc={f.desc}
                structure={f.structure}
                suitableFor={f.suitableFor}
                videoUrl={f.VIDEO_URL}
                posterUrl={f.POSTER_URL}
                duration={f.duration}
                runtime={formatRuntime(f.durationSeconds)}
                color={f.color}
                playAspect={f.aspect}
                ctaFormatId={FORMATS.find((x) => x.key === f.key)?.formId ?? null}
                ctaSource={`format:${f.key}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-2 sm:pt-2">
        <div className="mt-10 sm:mt-14 max-w-xl">
          <h3 className="font-display font-700 text-cream text-2xl sm:text-3xl leading-tight">
            {t("portfolio.executionHeading")}
          </h3>
        </div>

        <ExecutionOptions title={t("portfolio.voiceoverGroupTitle")} options={voiceoverOptions} hint={accordionHint} />
        <ExecutionOptions title={t("portfolio.styleGroupTitle")} options={styleOptions} hint={accordionHint} />
        <ExecutionOptions title={t("portfolio.aspectGroupTitle")} options={aspectOptions} hint={accordionHint} />
      </div>
    </section>
  )
}
