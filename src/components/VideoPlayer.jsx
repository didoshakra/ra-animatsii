"use client"

// src/components/VideoPlayer.jsx
// Спільний плеєр для VideoCard (головна) і ServiceCard (/services).
// До натискання play показує постер у idleAspect (з обрізанням), після — у реальних пропорціях відео.

import { useRef, useState } from "react"
import { useT } from "next-i18next/client"
import { useVideoTracking } from "@/lib/useVideoTracking"

export default function VideoPlayer({
  videoUrl,
  posterUrl,
  title,
  color,
  aspect = "16:9",
  idleAspect,
  playAspect,
  runtime,
  showAspect = true,
  compact = false,
  onPlayingChange,
}) {
  const { t } = useT("common")
  const videoRef = useRef(null)

  useVideoTracking(videoRef, videoUrl, title)

  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)
  const [realAspectRatio, setRealAspectRatio] = useState(null)

  const idleRatio = (idleAspect || aspect).replace(":", " / ")
  const defaultPlayRatio = aspect.replace(":", " / ")
  const explicitPlayRatio = playAspect ? playAspect.replace(":", " / ") : null

  const containerAspectRatio = playing ? explicitPlayRatio || realAspectRatio || defaultPlayRatio : idleRatio

  // У компактному режимі (мале віконце) зменшуємо кнопку й бейджі, поки відео не грає.
  const small = compact && !playing

  function updatePlaying(value) {
    setPlaying(value)
    if (onPlayingChange) onPlayingChange(value)
  }

  function handlePlay() {
    updatePlaying(true)

    const el = videoRef.current
    if (!el) return

    const result = el.play()

    if (result && typeof result.catch === "function") {
      result.catch(() => setError(true))
    }
  }

  function handleLoadedMetadata() {
    const el = videoRef.current
    if (!el || !el.videoWidth || !el.videoHeight) return

    setRealAspectRatio(`${el.videoWidth} / ${el.videoHeight}`)
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${color || "bg-ink"} ${small ? "rounded-2xl" : ""}`}
      style={{ aspectRatio: containerAspectRatio }}
    >
      <div className="relative h-full w-full overflow-hidden">
        {error ? (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink px-2 text-center text-cream focus-ring"
          >
            <span
              className={`flex items-center justify-center rounded-full bg-cream/90 ${small ? "h-8 w-8" : "h-12 w-12"}`}
            >
              <span className="ml-1 h-0 w-0 border-y-[9px] border-y-transparent border-l-[14px] border-l-ink" />
            </span>
            {!small && <span className="font-body text-sm">{t("videoCard.playFallback")}</span>}
          </a>
        ) : (
          <>
            <video
              ref={videoRef}
              poster={posterUrl}
              controls={playing}
              playsInline
              preload="none"
              className="h-full w-full object-cover"
              onPause={() => updatePlaying(false)}
              onError={() => setError(true)}
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            {!playing && (
              <button
                type="button"
                onClick={handlePlay}
                aria-label={t("videoCard.playAriaLabel", { title })}
                className="absolute inset-0 flex items-center justify-center bg-ink/10 transition-colors hover:bg-ink/25 focus-ring"
              >
                <span
                  className={`flex items-center justify-center rounded-full bg-cream/90 shadow-md ${
                    small ? "h-9 w-9" : "h-14 w-14"
                  }`}
                >
                  <span
                    className={`ml-1 h-0 w-0 border-y-transparent border-l-ink ${
                      small ? "border-y-[7px] border-l-[11px]" : "border-y-[10px] border-l-[15px]"
                    }`}
                  />
                </span>
              </button>
            )}
          </>
        )}

        <div
          className={`absolute flex items-center justify-between gap-2 ${small ? "inset-x-1.5 bottom-1.5" : "inset-x-3 bottom-3"}`}
        >
          {showAspect && !small && aspect && (
            <span className="rounded-md bg-ink/85 px-2 py-1 text-xs font-semibold text-cream backdrop-blur-sm">
              {aspect}
            </span>
          )}

          {runtime && (
            <span
              className={`ml-auto rounded-md bg-ink/85 font-semibold text-cream backdrop-blur-sm ${
                small ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"
              }`}
            >
              {runtime}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
