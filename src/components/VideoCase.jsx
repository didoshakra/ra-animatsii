// src/components/VideoCase.jsx
"use client"
console.log("VideoCase.jsx LOADED")
import VideoCard from "./VideoCard"
import { useT } from "next-i18next/client"
import { getCloudinaryPoster, getCloudinaryUploadDate, secondsToIsoDuration } from "@/lib/cloudinaryVideo"
import { siteUrl } from "@/lib/site"
import { videosFrom, formatRuntime } from "@/lib/videos"
import { FORMATS } from "@/lib/pages"
import ukCommon from "../../public/locales/uk/common.json"

export default function VideoCase() {
  const { t } = useT("common")
  const casesText = t("realCase.cases", { returnObjects: true })
  const badgePrefix = t("realCase.badgePrefix")

  const ukCases = ukCommon.realCase.cases

  const cases = videosFrom("cases").map((v) => {
    const text = casesText[v.key] || {}
    const videoUrl = text.videoUrl || ukCases[v.key]?.videoUrl || ""
    return {
      ...v,
      ...text,
      // Підпис формату береться з одного місця: portfolio.formats.<format>.label
      desc: t(`portfolio.formats.${v.format}.label`),
      formId: FORMATS.find((f) => f.key === v.format)?.formId ?? null,
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
  console.table(
    cases.map((c) => ({
      id: c.id,
      aspect: c.aspect,
    })),
  )
  return (
    <div className="mt-8 bg-ink rounded-3xl p-6 sm:p-8">
      {videoSchemas.map((schema, i) => (
        <script
          key={cases[i].id}
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
            aspect={c.aspect}
            runtime={formatRuntime(c.durationSeconds)}
            meta={`${c.visualStyle} · ${c.soundType}`}
            ctaFormatId={c.formId}
            ctaSource={`video:${c.id}`}
            ctaVideoName={c.title}
          />
        ))}
      </div>
    </div>
  )
}
