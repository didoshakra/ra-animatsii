// src/components/Hero  .jsx

import Image from "next/image"

const PERKS = ["Перша розкадровка за 48 год", "Безкоштовна консультація", "Без шаблонів"]

/* Хвиляста кіноплівкова стрічка з кадрами-іконками навколо маскота */
function FilmRibbon() {
  const ribbonPath = "M30,30 C170,55 40,185 190,215 C345,245 215,375 390,430"

  const frames = [
    { x: 62, y: 62, rotate: -12, icon: "pencil" },
    { x: 168, y: 150, rotate: 8, icon: "palette" },
    { x: 235, y: 245, rotate: -6, icon: "mic" },
    { x: 320, y: 335, rotate: 10, icon: "star" },
    { x: 372, y: 408, rotate: -8, icon: "play" },
  ]

  function FrameIcon({ type }) {
    switch (type) {
      case "pencil":
        return (
          <path
            d="M-7,7 L4,-4 L8,0 L-3,11 L-8,10 Z"
            fill="#FFC94D"
            stroke="#2F2416"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        )
      case "palette":
        return (
          <g>
            <circle r="8" fill="#F2A65A" stroke="#2F2416" strokeWidth="1.4" />
            <circle cx="-3" cy="-3" r="1.6" fill="#5FA653" />
            <circle cx="3" cy="-3" r="1.6" fill="#2E8FC0" />
            <circle cx="0" cy="4" r="1.6" fill="#FBF6E9" />
          </g>
        )
      case "mic":
        return (
          <g stroke="#2F2416" strokeWidth="1.4" fill="#FBF6E9">
            <rect x="-3.5" y="-9" width="7" height="12" rx="3.5" />
            <path d="M-6,-1 a6,6 0 0 0 12,0" fill="none" />
            <line x1="0" y1="5" x2="0" y2="9" />
          </g>
        )
      case "star":
        return (
          <path
            d="M0,-9 L2.4,-2.6 L9,-2 L4,2.6 L5.6,9 L0,5.4 L-5.6,9 L-4,2.6 L-9,-2 L-2.4,-2.6 Z"
            fill="#FFC94D"
            stroke="#2F2416"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        )
      case "play":
        return (
          <g>
            <circle r="9" fill="#5FA653" stroke="#2F2416" strokeWidth="1.4" />
            <path d="M-2.5,-4.5 L5,0 L-2.5,4.5 Z" fill="#FBF6E9" />
          </g>
        )
      default:
        return null
    }
  }

  return (
    <svg viewBox="0 0 420 460" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* сама стрічка */}
      <path d={ribbonPath} fill="none" stroke="#2F2416" strokeWidth="46" strokeLinecap="round" />
      {/* перфорація по краях, повторює вигин */}
      <path
        d={ribbonPath}
        fill="none"
        stroke="#FBF6E9"
        strokeOpacity="0.9"
        strokeWidth="2.5"
        strokeDasharray="7 11"
        transform="translate(-17,-9)"
      />
      <path
        d={ribbonPath}
        fill="none"
        stroke="#FBF6E9"
        strokeOpacity="0.9"
        strokeWidth="2.5"
        strokeDasharray="7 11"
        transform="translate(17,9)"
      />

      {/* кадри-ілюстрації вздовж стрічки */}
      {frames.map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.rotate})`}>
          <rect x="-17" y="-17" width="34" height="34" rx="6" fill="#FBF6E9" stroke="#2F2416" strokeWidth="2" />
          <FrameIcon type={f.icon} />
        </g>
      ))}
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-sky-light via-sky-light to-sky pt-14 pb-24 sm:pt-20 sm:pb-32"
    >
      {/* сонце */}
      <div
        aria-hidden="true"
        className="absolute -top-10 left-[6%] w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-sun shadow-[0_0_0_18px_rgba(255,201,77,0.35)]"
      />
      {/* хмаринки */}
      <div
        aria-hidden="true"
        className="absolute top-16 right-[8%] w-28 h-14 bg-white/80 rounded-full blur-[1px] hidden sm:block"
      />
      <div
        aria-hidden="true"
        className="absolute top-28 right-[18%] w-20 h-10 bg-white/70 rounded-full blur-[1px] hidden sm:block"
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <h1 className="font-display font-800 text-ink text-[2.1rem] sm:text-5xl lg:text-[3.4rem] leading-[1.12] sm:leading-[1.08] tracking-tight">
            Мультяшна реклама,
            <br />
            яку дивляться до кінця
          </h1>
          <p className="mt-5 font-body text-xl text-ink/80 max-w-lg leading-relaxed">
            Малюємо теплі, живі відеоролики, які пояснюють складне просто, запам&rsquo;ятовуються і роблять вашу
            компанію&nbsp;— трохи казковою.
          </p>

          <div className="mt-8 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 xs:gap-4">
            <a
              href="#contact"
              className="font-display font-700 text-cream bg-meadow-deep px-7 py-3.5 rounded-full text-base sm:text-lg text-center hover:bg-meadow-deep/90 transition-colors focus-ring shadow-[0_4px_0_0_theme(colors.ink)] active:translate-y-[3px] active:shadow-none"
            >
              Замовити ролик
            </a>
            <a
              href="#portfolio"
              className="font-display font-600 text-ink px-6 py-3.5 rounded-full text-base sm:text-lg text-center border-2 border-ink/15 hover:border-clay transition-colors focus-ring"
            >
              Дивитись приклади
            </a>
          </div>

          {/* 3 короткі переваги під CTA */}
          <ul className="mt-6 flex flex-col xs:flex-row flex-wrap gap-x-6 gap-y-2">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-2 font-body text-sm sm:text-base text-ink/75">
                <span
                  aria-hidden="true"
                  className="shrink-0 w-5 h-5 rounded-full bg-meadow-deep text-cream flex items-center justify-center text-xs font-700"
                >
                  ✓
                </span>
                {perk}
              </li>
            ))}
          </ul>

          <p className="mt-6 font-body text-base text-ink/60">
            Від сценарію до готового ролика — один автор, один стиль, без правок&nbsp;«за замовчуванням».
          </p>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-[280px] h-[300px] sm:w-[360px] sm:h-[390px]">
            <FilmRibbon />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[220px] h-[220px] sm:w-[290px] sm:h-[290px]">
                <div aria-hidden="true" className="absolute inset-0 bg-sun-light rounded-blob rotate-6" />
                <Image
                  src="/brand/eagle.png"
                  alt="Маскот студії RA Анімації — мультяшний орел"
                  fill
                  className="object-contain relative drop-shadow-xl p-4"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
