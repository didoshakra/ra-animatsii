//GPT20261021_doKV//src/components/VideoCard.jsx
"use client"

import { useRef, useState } from "react"
import { useT } from "next-i18next/client"
import { useVideoTracking } from "@/lib/useVideoTracking"
import PricingCta from "./PricingCta"

export default function VideoCard({
  title,
  desc,
  videoUrl,
  posterUrl,
  duration,
  color,
  badge,
  aspectLabel,
  meta,
//   aspect = "16:9",
  aspect = "16:9",
  playAspect,
  structure,
  suitableFor,
  runtime,
  ctaFormatId,
  ctaSource,
  ctaVideoName,
  price,
  executionTime,
  durationLabel,
  packageLabel,
  popularBadge,
  ctaLabel,
  detailsHref,
  detailsLabel,
}) {
  const { t } = useT("common")
  const videoRef = useRef(null)

  useVideoTracking(videoRef, videoUrl, title || badge)

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
    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-cream shadow-[0_5px_0_0_theme(colors.meadow.deep)]">
      {popularBadge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink shadow-sm">
          {popularBadge}
        </span>
      )}

      <div
        className={`relative w-full overflow-hidden ${color || "bg-ink"}`}
        style={{ aspectRatio: containerAspectRatio }}
      >
        <div className="relative h-full w-full overflow-hidden">
          {error ? (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink px-4 text-center text-cream focus-ring"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/90">
                <span className="ml-1 h-0 w-0 border-y-[9px] border-y-transparent border-l-[14px] border-l-ink" />
              </span>
              <span className="font-body text-sm">{t("videoCard.playFallback")}</span>
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
                  aria-label={t("videoCard.playAriaLabel", { title })}
                  className="absolute inset-0 flex items-center justify-center bg-ink/10 transition-colors hover:bg-ink/25 focus-ring"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/90 shadow-md">
                    <span className="ml-1 h-0 w-0 border-y-[10px] border-y-transparent border-l-[15px] border-l-ink" />
                  </span>
                </button>
              )}
            </>
          )}

          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
            {aspect && (
              <span className="rounded-md bg-ink/85 px-2 py-1 text-xs font-semibold text-cream backdrop-blur-sm">
                {aspect}
              </span>
            )}

            {runtime && (
              <span className="rounded-md bg-ink/85 px-2 py-1 text-xs font-semibold text-cream backdrop-blur-sm">
                {runtime}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {packageLabel && (
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-meadow-deep">{packageLabel}</p>
        )}

        {title && (
          <h3 className="font-display text-xl font-bold leading-snug text-ink">{title.replace(/^\d+\.\s*/, "")}</h3>
        )}

        {price && <div className="mt-3">{price}</div>}
        {(duration || executionTime) && (
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-clay-deep">
            {duration && <span>{duration}</span>}

            {duration && executionTime && <span aria-hidden="true">·</span>}

            {executionTime && (
              <span>
                {durationLabel} {executionTime}
              </span>
            )}
          </div>
        )}

        {meta && <p className="mt-2 text-sm text-ink/60">{meta}</p>}

        {desc && <p className="mt-4 text-[15px] font-medium leading-relaxed text-ink/90">{desc}</p>}

        {structure && (
          <p className="mt-4 rounded-xl bg-meadow/10 px-3 py-3 text-sm font-bold leading-relaxed text-meadow-deep">
            {structure}
          </p>
        )}

        {suitableFor && <p className="mt-3 text-[15px] font-medium leading-relaxed text-ink/80">{suitableFor}</p>}

        <div className="mt-auto flex flex-col gap-2 pt-5">
          {ctaSource && (
            <PricingCta
              formatId={ctaFormatId}
              source={ctaSource}
              prefill={
                ctaVideoName
                  ? t("contactForm.prefillVideo", {
                      name: ctaVideoName,
                      interpolation: { escapeValue: false },
                    })
                  : ""
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-center text-sm font-bold text-cream transition-colors hover:bg-meadow-deep focus-ring"
            >
              {ctaLabel || t("videoCard.wantSimilar")}
              <span aria-hidden="true">→</span>
            </PricingCta>
          )}

          {detailsHref && (
            <a
              href={detailsHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-meadow-deep px-4 py-2.5 text-center text-sm font-bold text-meadow-deep transition-colors hover:bg-meadow-deep hover:text-cream focus-ring"
            >
              {detailsLabel} <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
