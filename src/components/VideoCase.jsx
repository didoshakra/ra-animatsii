"use client"

import VideoCard from "./VideoCard"
import { useT } from "next-i18next/client"

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
    POSTER_URL: "",
    playAspect: "16:9",
  },
  {
    id: "case2",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1789065469/pictures/atls4zfubslslzse40j8.mp4",
    POSTER_URL: "",
    playAspect: "9:16",
  },
  // {
  //   id: "ra-animatsii",
  //   VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1787948940/pictures/pj2ve2yzzbv8fv0xgryp.mp4",
  //   POSTER_URL: "",
  //   playAspect: "9:16",
  // },
  {
    id: "case3",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788965604/pictures/tecdcduffhrzpao2ifvn.mp4",
    POSTER_URL: "",
    playAspect: "9:16",
  },
  {
    id: "case4",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788965660/pictures/myxlcznejrhh9xbj55m6.mp4",
    POSTER_URL: "",
    playAspect: "9:16",
  },
  {
    id: "case5",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788631121/pictures/j3367j6rbnq6wh4e32iy.mp4",
    POSTER_URL: "",
    playAspect: "9:16",
  },
  {
    id: "case6",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788628852/pictures/jeem8w4fqt2ssohdtrdi.mp4",
    POSTER_URL: "",
    playAspect: "16:9",
  },
]

export default function VideoCase() {
  const { t } = useT("common")
  const casesText = t("realCase.cases", { returnObjects: true })
  const badgePrefix = t("realCase.badgePrefix")

  const cases = CASE_CONFIG.map((cfg) => ({
    ...cfg,
    ...casesText[cfg.id],
  }))

  return (
    <div className="mt-8 bg-ink rounded-3xl p-6 sm:p-8">
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
