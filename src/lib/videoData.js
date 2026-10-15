// src/lib/videoData.js
import { getT } from "next-i18next/server"
import { getCloudinaryPoster } from "@/lib/cloudinaryVideo"
import ukCommon from "../../public/locales/uk/common.json"

// Додає до роликів із videos.js назву, посилання на відео й постер
export async function resolveVideos(list, lng) {
  const L = lng === "en" ? "en" : "uk"
  const { t } = await getT("common")
  const formatsText = t("portfolio.formats", { returnObjects: true }) || {}
  const casesText = t("realCase.cases", { returnObjects: true }) || {}

  return list.map((v) => {
    const isFormat = v.from === "formats"
    const text = (isFormat ? formatsText : casesText)[v.key] || {}
    const ukText = (isFormat ? ukCommon.portfolio.formats : ukCommon.realCase.cases)[v.key] || {}
    const videoUrl = text.videoUrl || ukText.videoUrl || ""
    return {
      ...v,
      displayTitle: v.name?.[L] || text.title || ukText.title || "",
      meta: text.visualStyle && text.soundType ? `${text.visualStyle} · ${text.soundType}` : undefined,
      VIDEO_URL: videoUrl,
      POSTER_URL: getCloudinaryPoster(videoUrl),
    }
  })
}
