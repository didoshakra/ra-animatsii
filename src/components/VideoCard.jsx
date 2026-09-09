"use client"

import { useRef, useState } from "react"

export default function VideoCard({
  title,
  desc,
  videoUrl,
  posterUrl,
  duration,
  color,
  badge,
  meta,
  aspect = "16:9",
  playAspect,
  structure,
  suitableFor,
}) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)
  const [realAspectRatio, setRealAspectRatio] = useState(null)
  const defaultAspectRatio = aspect.replace(":", " / ")
  const explicitPlayAspectRatio = playAspect ? playAspect.replace(":", " / ") : null
  const containerAspectRatio = playing
    ? explicitPlayAspectRatio || realAspectRatio || defaultAspectRatio
    : defaultAspectRatio

  function handlePlay() {
    setPlaying(true)
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
    <div className="bg-cream rounded-3xl p-6 flex flex-col shadow-[0_6px_0_0_theme(colors.meadow.deep)]">
      {badge && (
        <span className="inline-block self-start bg-meadow/15 text-meadow-deep font-body font-700 text-xs px-3 py-1 rounded-full mb-3">
          {badge}
        </span>
      )}
      <div
        className={`relative w-full rounded-2xl overflow-hidden transition-[aspect-ratio] duration-300 ${
          color ? `${color} p-2` : "bg-ink"
        }`}
        style={{ aspectRatio: containerAspectRatio }}
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-ink">
          {error ? (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink text-cream text-center px-4 focus-ring"
            >
              <span className="w-12 h-12 rounded-full bg-cream/90 flex items-center justify-center">
                <span className="ml-1 w-0 h-0 border-y-[9px] border-y-transparent border-l-[14px] border-l-ink" />
              </span>
              <span className="font-body text-sm">Не вдалось відтворити тут — відкрити відео</span>
            </a>
          ) : (
            <>
              <video
                ref={videoRef}
                poster={posterUrl}
                controls={playing}
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
                onPause={() => setPlaying(false)}
                onError={() => setError(true)}
                onLoadedMetadata={handleLoadedMetadata}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              {!playing && (
                <button
                  type="button"
                  onClick={handlePlay}
                  aria-label={`Відтворити відео: ${title}`}
                  className="absolute inset-0 flex items-center justify-center bg-ink/20 hover:bg-ink/30 transition-colors focus-ring"
                >
                  <span className="w-16 h-16 rounded-full bg-cream/90 flex items-center justify-center">
                    <span className="ml-1 w-0 h-0 border-y-[11px] border-y-transparent border-l-[17px] border-l-ink" />
                  </span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {(title || desc || duration) && (
        <div className="mt-5">
          {title && <p className="font-display font-700 text-xl text-ink">{title}</p>}
          {meta && <p className="font-body text-sm text-ink/50 mt-1">{meta}</p>}
          {duration && <p className="font-body text-base text-clay-deep font-700 mt-1">{duration}</p>}
          {desc && <p className="font-body text-lg text-ink/70 mt-1 leading-relaxed">{desc}</p>}
          {structure && <p className="font-body text-sm text-meadow-deep font-700 mt-3">{structure}</p>}
          {suitableFor && <p className="font-body text-sm text-ink/55 mt-1 leading-relaxed">{suitableFor}</p>}
        </div>
      )}
    </div>
  )
}
