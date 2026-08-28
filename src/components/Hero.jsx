import Image from "next/image";

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

          <p className="mt-6 font-body text-base text-ink/60">
            Від сценарію до готового ролика — один автор, один стиль, без правок&nbsp;«за замовчуванням».
          </p>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-sun-light rounded-blob rotate-6"
            />
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
    </section>
  );
}
