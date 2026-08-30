// src/components/Hero.jsx
import Image from "next/image"

const PERKS = ["Перша розкадровка за 48 год", "Безкоштовна консультація", "Без шаблонів"]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-sky-light pt-14 pb-24 sm:pt-20 sm:pb-32">
      {/* Фон: кіноплівкові стрічки */}
      <Image
        src="/media/studio/hero-film-strip-bg.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Кольорова підсвітка поверх фото — додає атмосфери, а не просто вибілює */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-sky-light/45 via-transparent to-sun-light/35"
      />
      {/* Підсвітка під текстом зліва — світліше зліва, прозоріше праворуч */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-cream/80 via-cream/40 to-transparent" />
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
              className="font-display font-600 text-ink px-6 py-3.5 rounded-full text-base sm:text-lg text-center border-2 border-ink/15 hover:border-clay transition-colors focus-ring bg-cream/60"
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

        {/* Орел — з підсвіткою, щоб виступав над строкатим фоном */}
        <div className="relative flex justify-center md:justify-end md:-mt-[300px]">
          <div className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px]">
            <div aria-hidden="true" className="absolute inset-0 bg-sun-light rounded-blob rotate-6 blur-[2px]" />
            <div aria-hidden="true" className="absolute -inset-4 bg-cream/60 rounded-blob blur-2xl" />
            <Image
              src="/brand/eagle.png"
              alt="Маскот студії RA Анімації — мультяшний орел"
              fill
              sizes="(max-width: 640px) 260px, 340px"
              className="object-contain relative drop-shadow-2xl p-4"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
