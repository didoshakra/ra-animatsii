import {
  ManicureIllustration,
  CafeIllustration,
  OfficeIllustration,
} from "./PricingIcons";

const plans = [
  {
    name: "Старт",
    segment: "Для малого бізнесу",
    price: "від 4 000 грн",
    days: "5 робочих днів",
    desc: "Короткий і яскравий ролик для соцмереж — до 20 секунд анімації з одним персонажем та музикою з бібліотеки. Швидко доносить головну думку та зупиняє погляд у стрічці Reels чи TikTok. Включає один раунд правок.",
    highlight: false,
    Illustration: ManicureIllustration,
  },
  {
    name: "Бізнес",
    segment: "Для середнього бізнесу",
    price: "від 9 000 грн",
    days: "10 робочих днів",
    desc: "Пояснювальний ролик до 60 секунд із до трьох персонажами та голосом диктора — розкриває цінність продукту через зв'язну історію. Підходить для сайту, презентацій і масштабної рекламної кампанії. Два раунди правок і адаптація під усі формати.",
    highlight: true,
    Illustration: CafeIllustration,
  },
  {
    name: "Преміум",
    segment: "Для великого бізнесу",
    price: "за розрахунком",
    days: "15+ робочих днів",
    desc: "Авторська візитівка бренду або серія роликів з індивідуальною тривалістю та персонажами, розробленими саме під ваш бренд. Оригінальна музика, максимальна увага до деталей і необмежені правки в межах узгодженого брифу.",
    highlight: false,
    Illustration: OfficeIllustration,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-sky-light py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <h2 className="font-display font-800 text-ink text-3xl sm:text-4xl text-center">
          Тарифи
        </h2>
        <p className="mt-3 font-body text-lg text-ink/70 text-center max-w-xl mx-auto">
          Орієнтовні пакети — фінальна вартість залежить від складності сценарію та кількості персонажів.
        </p>

        <div className="mt-12 flex flex-col gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl overflow-hidden flex flex-col sm:flex-row ${
                p.highlight
                  ? "bg-clay text-cream shadow-[0_8px_0_0_theme(colors.clay.deep)]"
                  : "bg-cream text-ink shadow-[0_6px_0_0_rgba(47,36,22,0.15)]"
              }`}
            >
              <div className="sm:w-[38%] h-44 sm:h-auto shrink-0">
                <p.Illustration />
              </div>

              <div className="p-7 sm:p-8 flex flex-col flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <div>
                    <p
                      className={`font-body font-700 text-sm uppercase tracking-wide ${
                        p.highlight ? "text-cream/70" : "text-clay-deep"
                      }`}
                    >
                      {p.segment}
                    </p>
                    <h3 className="font-display font-700 text-2xl sm:text-3xl mt-1">
                      {p.name}
                    </h3>
                  </div>
                  <p className="font-display font-800 text-2xl sm:text-3xl">
                    {p.price}
                  </p>
                </div>

                <p
                  className={`mt-4 font-body text-lg leading-relaxed ${
                    p.highlight ? "text-cream/90" : "text-ink/75"
                  }`}
                >
                  {p.desc}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p
                    className={`font-body font-700 text-base ${
                      p.highlight ? "text-cream/80" : "text-clay-deep"
                    }`}
                  >
                    Термін виконання: {p.days}
                  </p>
                  <a
                    href="#contact"
                    className={`font-display font-700 rounded-full px-6 py-3 focus-ring transition-colors ${
                      p.highlight
                        ? "bg-cream text-clay-deep hover:bg-cream/90"
                        : "bg-ink text-cream hover:bg-ink/85"
                    }`}
                  >
                    Обрати пакет
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
