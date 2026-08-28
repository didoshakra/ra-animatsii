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
    desc: "Короткий ролик для соцмереж",
    features: ["До 20 сек анімації", "1 персонаж", "Музика з бібліотеки", "1 раунд правок"],
    highlight: false,
    Illustration: ManicureIllustration,
  },
  {
    name: "Бізнес",
    segment: "Для середнього бізнесу",
    price: "від 9 000 грн",
    desc: "Пояснювальний ролик для сайту",
    features: [
      "До 60 сек анімації",
      "До 3 персонажів",
      "Голос диктора",
      "2 раунди правок",
      "Адаптація під формати",
    ],
    highlight: true,
    Illustration: CafeIllustration,
  },
  {
    name: "Преміум",
    segment: "Для великого бізнесу",
    price: "за розрахунком",
    desc: "Візитівка бренду або серія роликів",
    features: [
      "Індивідуальна тривалість",
      "Розробка персонажів під бренд",
      "Оригінальна музика",
      "Необмежені правки в межах брифу",
    ],
    highlight: false,
    Illustration: OfficeIllustration,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-sky-light py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display font-800 text-ink text-3xl sm:text-4xl text-center">
          Тарифи
        </h2>
        <p className="mt-3 font-body text-lg text-ink/70 text-center max-w-xl mx-auto">
          Орієнтовні пакети — фінальна вартість залежить від складності сценарію та кількості персонажів.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6 items-start">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl overflow-hidden flex flex-col ${
                p.highlight
                  ? "bg-clay text-cream md:-translate-y-3 shadow-[0_8px_0_0_theme(colors.clay.deep)]"
                  : "bg-cream text-ink shadow-[0_6px_0_0_rgba(47,36,22,0.15)]"
              }`}
            >
              <div className="h-36 w-full">
                <p.Illustration />
              </div>

              <div className="p-7 flex flex-col flex-1">
                <p
                  className={`font-body font-700 text-sm uppercase tracking-wide ${
                    p.highlight ? "text-cream/70" : "text-clay-deep"
                  }`}
                >
                  {p.segment}
                </p>
                <h3 className="font-display font-700 text-2xl mt-1">{p.name}</h3>
                <p
                  className={`font-body text-lg mt-1 ${
                    p.highlight ? "text-cream/85" : "text-ink/65"
                  }`}
                >
                  {p.desc}
                </p>
                <p className="font-display font-800 text-2xl mt-5">{p.price}</p>

                <ul className="mt-6 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="font-body text-lg flex items-start gap-2">
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                          p.highlight ? "bg-cream" : "bg-clay"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-7 text-center font-display font-700 rounded-full py-3 focus-ring transition-colors ${
                    p.highlight
                      ? "bg-cream text-clay-deep hover:bg-cream/90"
                      : "bg-ink text-cream hover:bg-ink/85"
                  }`}
                >
                  Обрати пакет
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
