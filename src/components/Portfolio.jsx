import VideoCard from "./VideoCard"
import ExecutionOptions from "./ExecutionOptions"
import { getT } from "next-i18next/server"
import { getCloudinaryPoster, getCloudinaryUploadDate, secondsToIsoDuration } from "@/lib/cloudinaryVideo"

const siteUrl = "https://raspark.com"

// Структурні поля форматів (не текст) — колір фону, відео, співвідношення сторін.
const FORMAT_CONFIG = [
  {
    id: "short",
    color: "bg-sky-light",
    playAspect: "9:16",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788965604/pictures/tecdcduffhrzpao2ifvn.mp4",
    durationSeconds: 14,
  },
  {
    id: "ad",
    color: "bg-sun-light",
    playAspect: "9:16",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1789195430/pictures/nciurc1gozkhaba5iajh.mp4",
    durationSeconds: 38,
  },
  {
    id: "brand",
    color: "bg-meadow-light",
    playAspect: "16:9",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1787948940/pictures/pj2ve2yzzbv8fv0xgryp.mp4",
    durationSeconds: 10,
  },
  {
    id: "story",
    color: "bg-sky-light",
    // playAspect: "16:9",
    playAspect: "9:16",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1790173879/pictures/uvsbcobudhtciyjoulim.mp4",
    durationSeconds: 56,
  },
]

export default async function Portfolio() {
  const { t } = await getT("common")
  const formatsText = t("portfolio.formats", { returnObjects: true })
  const voiceoverOptions = t("portfolio.voiceoverOptions", { returnObjects: true })
  const styleOptions = t("portfolio.styleOptions", { returnObjects: true })
  const aspectOptions = t("portfolio.aspectOptions", { returnObjects: true })
  const accordionHint = t("portfolio.accordionHint")

  const formats = FORMAT_CONFIG.map((cfg) => ({
    ...cfg,
    ...formatsText[cfg.id],
    POSTER_URL: getCloudinaryPoster(cfg.VIDEO_URL),
  }))

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
    <section id="portfolio" className="bg-meadow pb-14 sm:pb-20">
      {videoSchemas.map((schema, i) => (
        <script
          key={FORMAT_CONFIG[i].id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="bg-meadow-light py-10 sm:py-10">
        <div className="bg-meadow-light py-10 sm:py-14">
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
                color={f.color}
                playAspect={f.playAspect}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <div className=""> */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14">
        <div className="mt-10 sm:mt-14 max-w-xl">
          <h3 className="font-display font-700 text-cream text-2xl sm:text-3xl leading-tight">
            {t("portfolio.executionHeading")}
          </h3>
        </div>

        <ExecutionOptions title={t("portfolio.voiceoverGroupTitle")} options={voiceoverOptions} hint={accordionHint} />
        <ExecutionOptions title={t("portfolio.styleGroupTitle")} options={styleOptions} hint={accordionHint} />
        <ExecutionOptions title={t("portfolio.aspectGroupTitle")} options={aspectOptions} hint={accordionHint} />
      </div>
      {/* </div> */}
    </section>
  )
}
