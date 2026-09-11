"use client"

import VideoCard from "./VideoCard"

const cases = [
  //   {
  //     title: "Lumpex24",
  //     soundType: "без озвучки",
  //     visualStyle: "плоска графіка",
  //     VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788688441/pictures/ynyyoxasgdxbdphhkjfe.mp4",
  //     POSTER_URL: "",
  //     playAspect: "9:16",
  //   },
  {
    title: "100-ok ",
    soundType: "Озвучка персонажів",
    desc: "Коротка реклама",
    visualStyle: "об'ємна графіка (3D)",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1789065442/pictures/ucq1ljbxqe0cnj5locpm.mp4",
    POSTER_URL: "",
    playAspect: "16:9",
  },
  {
    title: "100-ok ",
    soundType: "Озвучка персонажів",
    desc: "Коротка реклама",
    visualStyle: "об'ємна графіка (3D)",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1789065469/pictures/atls4zfubslslzse40j8.mp4",
    POSTER_URL: "",
    playAspect: "9:16",
  },
  //   {
  //     title: "ra-animаtsii",
  //     desc: "Візитівка бренду",
  //     soundType: "закадрове озвучення",
  //     visualStyle: "об'ємна графіка (3D)",
  //     VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1787948940/pictures/pj2ve2yzzbv8fv0xgryp.mp4",
  //     POSTER_URL: "",
  //     playAspect: "9:16",
  //   },

  {
    title: "Пекарня Родина",
    desc: "Рекламний ролик для соцмереж",
    soundType: "Озвучка персонажів",
    visualStyle: "об'ємна графіка (3D)",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788965604/pictures/tecdcduffhrzpao2ifvn.mp4",
    POSTER_URL: "",
    playAspect: "9:16",
  },
  {
    title: "Пекарня Родина 2",
    desc: "Рекламний ролик для соцмереж",
    soundType: "Озвучка персонажів",
    visualStyle: "об'ємна графіка (3D)",
    // visualStyle: "ізометрична графіка",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788965660/pictures/myxlcznejrhh9xbj55m6.mp4",
    POSTER_URL: "",
    playAspect: "9:16",
  },
  {
    title: "Solar",
    desc: "Рекламний ролик для соцмереж 9:16",
    soundType: "Озвучка персонажів",
    visualStyle: "об'ємна графіка (3D)",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788631121/pictures/j3367j6rbnq6wh4e32iy.mp4",
    POSTER_URL: "",
    playAspect: "9:16",
  },
  {
    title: "Solar 2",
    desc: "Рекламний ролик для соцмереж",
    soundType: "Озвучка персонажів",
    visualStyle: "об'ємна графіка (3D)",
    // visualStyle: "live-action + анімація",
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
            badge={`Кейс: ${c.title} ${c.playAspect}`}
            meta={`${c.visualStyle} · ${c.soundType}`}
          />
        ))}
      </div>
    </div>
  )
}
