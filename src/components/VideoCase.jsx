"use client";

import { useRef, useState } from "react";

const VIDEO_URL = "/media/portfolio/lumpex24.mp4";
const POSTER_URL = "/media/portfolio/lumpex24-poster.jpg";

export default function VideoCase() {
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
    <div className="mt-8 bg-cream rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-[0_6px_0_0_theme(colors.meadow.deep)]">
      <div className="relative w-full sm:w-72 aspect-video rounded-2xl overflow-hidden shrink-0 bg-ink">
        {error ? (
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink text-cream text-center px-4 focus-ring"
          >
            <span className="w-12 h-12 rounded-full bg-cream/90 flex items-center justify-center">
              <span className="ml-1 w-0 h-0 border-y-[9px] border-y-transparent border-l-[14px] border-l-ink" />
            </span>
            <span className="font-body text-sm">
              Не вдалось відтворити тут — відкрити відео
            </span>
          </a>
        ) : (
          <>
            <video
              ref={videoRef}
              poster={POSTER_URL}
              controls={playing}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              onPause={() => setPlaying(false)}
              onError={() => setError(true)}
            >
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
            {!playing && (
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Відтворити відео Lumpex24"
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
      <div>
        <p className="font-display font-700 text-xl text-ink">Lumpex24</p>
        <p className="font-body text-lg text-ink/70 mt-1 leading-relaxed">
          Рекламний ролик для соцмереж, знятий та анімований студією RA
          Анімації.
        </p>
      </div>
    </div>
  );
}
