"use client";

import { useRef, useState } from "react";

const VIDEO_URL =
  "https://res.cloudinary.com/daov9z9qc/video/upload/v1787920721/pictures/rbuswc5buzi2gk4xanee.mp4";
const POSTER_URL =
  "https://res.cloudinary.com/daov9z9qc/video/upload/so_1/v1787920721/pictures/rbuswc5buzi2gk4xanee.jpg";

export default function VideoCase() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <div className="mt-8 bg-cream rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-[0_6px_0_0_theme(colors.meadow.deep)]">
      <div className="relative w-full sm:w-72 aspect-video rounded-2xl overflow-hidden shrink-0 bg-ink">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          poster={POSTER_URL}
          controls={playing}
          playsInline
          className="w-full h-full object-cover"
          onPause={() => setPlaying(false)}
        />
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
