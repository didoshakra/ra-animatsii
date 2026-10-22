"use client"

// src/components/ServiceCard.jsx
// Картка послуги для /services: зліва назва, ціна й терміни, справа квадратне відео 1:1.
// Після play відео розгортається на всю ширину під назвою, ціна й опис зсуваються вниз.

import { useState } from "react"
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
  const [playing, setPlaying] = useState(false)

  const cleanTitle = title ? title.replace(/^\d+\.\s*/, "") : ""

  return (
    <article className="flex flex-col rounded-3xl bg-cream p-5 shadow-[0_6px_0_0_theme(colors.meadow.deep)]">
      {/* Один DOM-порядок: назва, відео, інфо. Змінюється лише розкладка, тож відео не перезавантажується. */}
      <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-3">
        <div className={playing ? "col-span-2 row-start-1" : "col-start-1 row-start-1"}>
          {packageLabel && (
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-meadow-deep">{packageLabel}</p>
          )}
          <h2 className="font-display text-lg font-bold leading-snug text-ink">
            <a href={href} className="hover:underline focus-ring">
              {cleanTitle}
            </a>
          </h2>
        </div>

        <div
          className={playing ? "col-span-2 row-start-2" : "col-start-2 row-span-2 row-start-1 w-[104px] sm:w-[116px]"}
        >
          <VideoPlayer
            videoUrl={videoUrl}
            posterUrl={posterUrl}
            title={cleanTitle}
            color={color}
            aspect={aspect}
            idleAspect="1:1"
            runtime={runtime}
            compact
            onPlayingChange={setPlaying}
          />
        </div>

        <div className={playing ? "col-span-2 row-start-3" : "col-start-1 row-start-2"}>
          {duration && <p className="font-body text-sm font-bold text-clay-deep">{duration}</p>}
          {price && <div className="mt-2">{price}</div>}
          {executionTime && (
            <p className="mt-2 font-body text-sm font-bold text-clay-deep">
              {durationLabel} {executionTime}
            </p>
          )}
        </div>
      </div>

      {desc && <p className="mt-4 line-clamp-3 font-body text-base leading-relaxed text-ink/80">{desc}</p>}

      <a
        href={href}
        className="mt-auto flex w-full items-center justify-center rounded-full bg-meadow px-4 py-2.5 font-body text-sm font-bold text-cream transition-colors hover:bg-meadow-deep focus-ring"
      >
        <span className="pt-0">{moreLabel} →</span>
      </a>
    </article>
  )
}
