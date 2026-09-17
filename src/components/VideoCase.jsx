"use client"

import VideoCard from "./VideoCard"
import { useT } from "next-i18next/client"
import { getCloudinaryPoster, getCloudinaryUploadDate, secondsToIsoDuration } from "@/lib/cloudinaryVideo"

const siteUrl = "https://raspark.com"

// Структурні поля кейсів (не текст) — відео, постер, співвідношення сторін.
const CASE_CONFIG = [
  // {
  //   id: "lumpex24",
  //   VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788688441/pictures/ynyyoxasgdxbdphhkjfe.mp4",
  //   POSTER_URL: "",
  //   playAspect: "9:16",
  // },
  {
    id: "case1",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1789065442/pictures/ucq1ljbxqe0cnj5locpm.mp4",
    playAspect: "16:9",
    durationSeconds: 10,
  },
  {
    id: "case2",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1789065469/pictures/atls4zfubslslzse40j8.mp4",
    playAspect: "9:16",
    durationSeconds: 8,
  },
  {
    id: "case3",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788965604/pictures/tecdcduffhrzpao2ifvn.mp4",
    playAspect: "9:16",
    durationSeconds: 14,
  },
  {
    id: "case4",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788965660/pictures/myxlcznejrhh9xbj55m6.mp4",
    playAspect: "9:16",
    durationSeconds: 18,
  },
  {
    id: "case5",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788631121/pictures/j3367j6rbnq6wh4e32iy.mp4",
    playAspect: "9:16",
    durationSeconds: 8,
  },
  {
    id: "case6",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788628852/pictures/jeem8w4fqt2ssohdtrdi.mp4",
    playAspect: "16:9",
    durationSeconds: 10,
  },
]

export default function VideoCase() {
  const { t } = useT("common")
  const casesText = t("realCase.cases", { returnObjects: true })
  const badgePrefix = t("realCase.badgePrefix")

  const cases = CASE_CONFIG.map((cfg) => ({
    ...cfg,
    ...casesText[cfg.id],
    POSTER_URL: getCloudinaryPoster(cfg.VIDEO_URL),
  }))

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
