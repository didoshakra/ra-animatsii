"use client"

// src/components/VideoCard.jsx
import { useT } from "next-i18next/client"
import VideoPlayer from "./VideoPlayer"
import PricingCta from "./PricingCta"

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

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-cream shadow-[0_5px_0_0_theme(colors.meadow.deep)]">
      {popularBadge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink shadow-sm">
          {popularBadge}
        </span>
      )}

      <VideoPlayer
        videoUrl={videoUrl}
        posterUrl={posterUrl}
        title={title || badge}
        color={color}
        aspect={aspect}
        playAspect={playAspect}
        runtime={runtime}
      />

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

        {desc && <p className="mt-4 text-sm leading-relaxed text-ink/75">{desc}</p>}

        {structure && (
          <p className="mt-4 rounded-xl bg-meadow/10 px-3 py-3 text-sm font-bold leading-relaxed text-meadow-deep">
            {structure}
          </p>
        )}

        {suitableFor && <p className="mt-3 text-sm leading-relaxed text-ink/70">{suitableFor}</p>}

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
