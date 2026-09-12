"use client"

import { useRef, useState } from "react"
import { useT } from "next-i18next/client"

// const VIDEO_SRC = "/media/studio/studio-promo.mp4";
const VIDEO_SRC = "https://res.cloudinary.com/daov9z9qc/video/upload/v1788450019/pictures/hadxijdnt1xqxmy2shee.mp4"
const POSTER_SRC = "/media/studio/studio-promo-poster.png"

export default function StudioVideo() {
  const { t } = useT("common")
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)

  function handlePlay() {
    setPlaying(true)
    const el = videoRef.current
    if (!el) return
    const result = el.play()
    if (result && typeof result.catch === "function") {
      result.catch(() => setError(true))
    }
  }

  return (
    <section id="studio-video" className="bg-cream py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display font-800 text-ink text-3xl sm:text-4xl leading-tight">
            {t("studioVideo.title")}
          </h2>
          <p className="mt-2 sm:mt-4 font-body text-base sm:text-lg text-ink/75 leading-relaxed">
            {t("studioVideo.description")}
          </p>
        </div>

        <div className="mt-6 sm:mt-10 grid md:grid-cols-[1.3fr_0.7fr] gap-4 md:gap-8 items-center">
          {/* Реальний відеоплеєр */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-ink shadow-[0_8px_0_0_theme(colors.clay.deep)]">
            {error ? (
              <a
                href={VIDEO_SRC}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink text-cream text-center px-4 focus-ring"
              >
                <span className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center">
                  <span className="ml-1 w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-ink" />
                </span>
                <span className="font-body text-sm">{t("studioVideo.videoFallback")}</span>
              </a>
            ) : (
              <>
                <video
                  ref={videoRef}
                  poster={POSTER_SRC}
                  controls={playing}
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  onPause={() => setPlaying(false)}
                  onError={() => setError(true)}
                >
                  <source src={VIDEO_SRC} type="video/mp4" />
                </video>
                {!playing && (
                  <button
                    type="button"
                    onClick={handlePlay}
                    aria-label={t("studioVideo.playAriaLabel")}
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

          {/* Чесна CTA-кнопка, не імітація плеєра */}
          <div className="flex flex-col items-start gap-2 sm:gap-4">
            <p className="font-display font-700 text-ink text-lg sm:text-2xl leading-snug">
              {t("studioVideo.ctaTitle")}
            </p>
            <p className="hidden sm:block font-body text-base text-ink/70 leading-relaxed">
              {t("studioVideo.ctaDescription")}
            </p>
            <a
              href="#contact"
              className="font-display font-700 text-cream bg-meadow-deep px-6 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-base sm:text-lg text-center hover:bg-meadow-deep/90 transition-colors focus-ring shadow-[0_4px_0_0_theme(colors.ink)] active:translate-y-[3px] active:shadow-none"
            >
              {t("studioVideo.ctaButton")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
