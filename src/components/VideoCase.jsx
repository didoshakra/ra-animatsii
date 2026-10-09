"use client"

import VideoCard from "./VideoCard"
import { useT } from "next-i18next/client"
import { getCloudinaryPoster, getCloudinaryUploadDate, secondsToIsoDuration } from "@/lib/cloudinaryVideo"
import ukCommon from "../../public/locales/uk/common.json"

const siteUrl = "https://raspark.com"

// Структурні поля кейсів (не текст) — відео, постер, співвідношення сторін.
const CASE_CONFIG = [
  {
    id: "case1",
    playAspect: "16:9",
    durationSeconds: 19,
  },
  {
    id: "case2",
    playAspect: "9:16",
    durationSeconds: 17,
  },
  {
    id: "case3",
    playAspect: "9:16",
    durationSeconds: 14,
  },
  {
    id: "case4",
    playAspect: "9:16",
    durationSeconds: 18,
  },
  {
    id: "case5",
    playAspect: "9:16",
    durationSeconds: 24,
  },
  {
    id: "case6",
    playAspect: "9:16",
    durationSeconds: 18,
  },
]

export default function VideoCase() {
  const { t } = useT("common")
  const casesText = t("realCase.cases", { returnObjects: true })
  const badgePrefix = t("realCase.badgePrefix")

  const ukCases = ukCommon.realCase.cases

  const cases = CASE_CONFIG.map((cfg) => {
    const text = casesText[cfg.id] || {}
    const videoUrl = text.videoUrl || ukCases[cfg.id]?.videoUrl || ""
    return {
      ...cfg,
      ...text,
      VIDEO_URL: videoUrl,
      POSTER_URL: getCloudinaryPoster(videoUrl),
    }
  })

  const videoSchemas = cases.map((c) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: c.title,
    description: c.desc,
    thumbnailUrl: [c.POSTER_URL],
    uploadDate: getCloudinaryUploadDate(c.VIDEO_URL),
    duration: secondsToIsoDuration(c.durationSeconds),
    contentUrl: c.VIDEO_URL,
    embedUrl: `${siteUrl}/#real-case`,
    publisher: { "@id": `${siteUrl}/#organization` },
  }))

  return (
    <div className="mt-8 bg-ink rounded-3xl p-6 sm:p-8">
      {videoSchemas.map((schema, i) => (
        <script
          key={CASE_CONFIG[i].id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {cases.map((c) => (
          <VideoCard
            key={c.id}
            title={c.title}
            desc={c.desc}
            videoUrl={c.VIDEO_URL}
            posterUrl={c.POSTER_URL}
            badge={`${badgePrefix} ${c.title}`}
            aspectLabel={c.playAspect}
            meta={`${c.visualStyle} · ${c.soundType}`}
          />
        ))}
      </div>
    </div>
  )
}
