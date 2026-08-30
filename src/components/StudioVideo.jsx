"use client";

import { useRef, useState } from "react";

const VIDEO_SRC = "/media/studio/studio-promo.mp4";
const POSTER_SRC = "/media/studio/studio-promo-poster.jpg";

export default function StudioVideo() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  function handlePlay() {
    setPlaying(true);
    const el = videoRef.current;
    if (!el) return;
    const result = el.play();
    if (result && typeof result.catch === "function") {
      result.catch(() => setError(true));
    }
  }

  return (
    <section id="studio-video" className="bg-cream py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display font-800 text-ink text-3xl sm:text-4xl leading-tight">
            Так ми розповідаємо про себе
          </h2>
          <p className="mt-4 font-body text-lg text-ink/75 leading-relaxed">
            Промо-ролик студії RA Анімації — знятий і анімований нашою
            командою, тим самим підходом, яким ми робимо ролики для клієнтів.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
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
                <span className="font-body text-sm">
                  Не вдалось відтворити тут — відкрити відео
                </span>
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
                    aria-label="Відтворити промо-відео студії"
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
          <div className="flex flex-col items-start gap-4">
            <p className="font-display font-700 text-ink text-xl sm:text-2xl leading-snug">
              Ваше відео починається тут
            </p>
            <p className="font-body text-base text-ink/70 leading-relaxed">
              Залиште заявку — обговоримо ідею й повернемось із першими
              ескізами протягом 48 годин.
            </p>
            <a
              href="#contact"
              className="font-display font-700 text-cream bg-meadow-deep px-7 py-3.5 rounded-full text-base sm:text-lg text-center hover:bg-meadow-deep/90 transition-colors focus-ring shadow-[0_4px_0_0_theme(colors.ink)] active:translate-y-[3px] active:shadow-none"
            >
              Замовити такий ролик
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
