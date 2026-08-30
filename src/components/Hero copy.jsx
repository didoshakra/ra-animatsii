import Image from "next/image";

const PERKS = [
  "Перша розкадровка за 48 год",
  "Безкоштовна консультація",
  "Без шаблонів",
];

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
      <div aria-hidden="true" className="absolute top-16 right-[8%] w-28 h-14 bg-white/80 rounded-full blur-[1px] hidden sm:block" />
      <div aria-hidden="true" className="absolute top-28 right-[18%] w-20 h-10 bg-white/70 rounded-full blur-[1px] hidden sm:block" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <h1 className="font-display font-800 text-ink text-[2.1rem] sm:text-5xl lg:text-[3.4rem] leading-[1.12] sm:leading-[1.08] tracking-tight">
            Мультяшна реклама,
            <br />
            яку дивляться до кінця
          </h1>
          <p className="mt-5 font-body text-xl text-ink/80 max-w-lg leading-relaxed">
            Малюємо теплі, живі відеоролики, які пояснюють складне просто,
            запам&rsquo;ятовуються і роблять вашу компанію&nbsp;— трохи казковою.
          </p>

          {/* Мердж-меседж команди (пробний варіант з AboutTeam) */}
          <p className="mt-4 font-body text-base sm:text-lg text-ink/70 max-w-lg leading-relaxed">
            За кожним роликом стоїть команда персонажів — сценарист, аніматор
            і диктор працюють як єдиний оркестр, щоб історія вашого бізнесу
            заговорила мовою анімації.
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
              <li
                key={perk}
                className="flex items-center gap-2 font-body text-sm sm:text-base text-ink/75"
              >
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

        {/* Превʼю-кадр студійного відео в кіноплівковій рамці */}
        <div className="relative flex justify-center md:justify-end">
          <a
            href="#studio-video"
            aria-label="Дивитись відео студії нижче"
            className="film-frame block w-full max-w-[420px] focus-ring group"
          >
            <div className="film-frame-inner relative aspect-video bg-ink">
              <Image
                src="/media/studio/studio-promo-poster.jpg"
                alt="Кадр із промо-відео студії RA Анімації"
                fill
                className="object-cover"
                priority
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/15 group-hover:bg-ink/25 transition-colors">
                <span className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center shadow-lg">
                  <span className="ml-1 w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-ink" />
                </span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
