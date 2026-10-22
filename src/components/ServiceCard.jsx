"use client"

// src/components/ServiceCard.jsx
// Картка послуги для /services: назва + позначка формату, відео на всю ширину (1:1),
// нижче ціна зі знижкою, тривалість і термін, опис та кнопка.
// Після play відео розтягується до реальних пропорцій (так само, як на головній).

import VideoPlayer from "./VideoPlayer"

export default function ServiceCard({
  title,
  duration,
  executionTime,
  durationLabel,
  packageLabel,
  price,
  desc,
  videoUrl,
  posterUrl,
  runtime,
  color,
  aspect,
  href,
  moreLabel,
}) {
  const cleanTitle = title ? title.replace(/^\d+\.\s*/, "") : ""

  return (
    <article className="flex flex-col rounded-3xl bg-cream p-5 shadow-[0_6px_0_0_theme(colors.meadow.deep)]">
      {packageLabel && (
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-meadow-deep">{packageLabel}</p>
      )}

      <h2 className="font-display text-lg font-bold leading-snug text-ink">
        <a href={href} className="hover:underline focus-ring">
          {title}
        </a>
      </h2>

      <div className="mt-3 overflow-hidden rounded-2xl">
        <VideoPlayer
          videoUrl={videoUrl}
          posterUrl={posterUrl}
          title={cleanTitle}
          color={color}
          aspect={aspect}
          idleAspect="1:1"
          runtime={runtime}
        />
      </div>

      {price && <div className="mt-4">{price}</div>}

      <p className="mt-2 font-body text-sm font-bold text-clay-deep">
        {duration}
        {duration && executionTime && <span aria-hidden="true"> · </span>}
        {executionTime && (
          <span>
            {durationLabel} {executionTime}
          </span>
        )}
      </p>

      {desc && <p className="mt-3 line-clamp-3 font-body text-base leading-relaxed text-ink/80">{desc}</p>}

      <div className="mt-auto pt-4">
        <a
          href={href}
          className="flex w-full items-center justify-center rounded-full bg-meadow px-4 py-2.5 font-body text-sm font-bold text-cream transition-colors hover:bg-meadow-deep focus-ring"
        >
          {moreLabel} →
        </a>
      </div>
    </article>
  )
}
