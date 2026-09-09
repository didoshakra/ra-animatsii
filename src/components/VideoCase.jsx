"use client"

import VideoCard from "./VideoCard"

const cases = [
  {
    title: "Lumpex24",
    soundType: "без озвучки",
    visualStyle: "плоска графіка",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788688441/pictures/ynyyoxasgdxbdphhkjfe.mp4",
    POSTER_URL: "",
    playAspect: "9:16",
  },
  {
    title: "ra-animаtsii-short",
    desc: "Візитівка бренду",
    soundType: "закадрове озвучення",
    visualStyle: "об'ємна графіка (3D)",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1787948940/pictures/pj2ve2yzzbv8fv0xgryp.mp4",
    POSTER_URL: "",
    playAspect: "9:16",
  },

  {
    title: "roduna_rekgemini_9-16_16sek",
    desc: "Рекламний ролик для соцмереж, знятий та анімований студією RA Анімації.",
    soundType: "без озвучки",
    visualStyle: "character animation",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788965604/pictures/tecdcduffhrzpao2ifvn.mp4",
    POSTER_URL: "",
    playAspect: "16:9",
  },
  {
    title: "roduna rerkgpt_9-16_ 20sek_compress",
    desc: "Рекламний ролик для соцмереж, знятий та анімований студією RA Анімації.",
    soundType: "закадрове озвучення",
    visualStyle: "ізометрична графіка",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788965660/pictures/myxlcznejrhh9xbj55m6.mp4",
    POSTER_URL: "",
    playAspect: "16:9",
  },
  {
    title: "sun1_compress",
    desc: "Рекламний ролик для соцмереж, знятий та анімований студією RA Анімації.",
    soundType: "озвучка персонажів",
    visualStyle: "motion graphics",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788631121/pictures/j3367j6rbnq6wh4e32iy.mp4",
    POSTER_URL: "",
    playAspect: "16:9",
  },
  {
    title: "sun2_compres",
    desc: "Рекламний ролик для соцмереж, знятий та анімований студією RA Анімації.",
    soundType: "озвучка персонажів",
    visualStyle: "live-action + анімація",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788628852/pictures/jeem8w4fqt2ssohdtrdi.mp4",
    POSTER_URL: "",
    playAspect: "16:9",
  },
]

export default function VideoCase() {
  return (
    <div className="mt-8 bg-ink rounded-3xl p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {cases.map((c, i) => (
          <VideoCard
            key={`${c.title}-${i}`}
            title={c.title}
            desc={c.desc}
            videoUrl={c.VIDEO_URL}
            posterUrl={c.POSTER_URL}
            badge={`Кейс: ${c.title}`}
            meta={`${c.visualStyle} · ${c.soundType}`}
          />
        ))}
      </div>
    </div>
  )
}
