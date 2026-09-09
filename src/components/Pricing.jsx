// Pricing.jsx
import { ManicureIllustration, CafeIllustration, OfficeIllustration, CustomIllustration } from "./PricingIcons"

const tiers = [
  {
    name: "Базовий",
    price: "від 4 000 грн",
    tagline: "Швидкий старт для соцмереж",
    days: "5 робочих днів",
    features: [
      "2D-анімація",
      "Без озвучки або мінімальна закадрова",
      "Коротка реклама, 10–15 сек",
      "Ідеально для TikTok / Reels / Shorts",
    ],
    Illustration: ManicureIllustration,
    highlight: false,
    // формат, який автоматично підсвітиться у формі контактів
    formatId: "short",
  },
  {
    name: "Стандарт",
    price: "від 9 000 грн",
    tagline: "Найпопулярніший вибір",
    days: "10 робочих днів",
    features: [
      "2D або проста 3D-анімація",
      "Закадрова озвучка",
      "Рекламний ролик, 20–30 сек",
      "Для соцмереж, YouTube, Meta Ads",
    ],
    Illustration: CafeIllustration,
    highlight: true,
    formatId: "ad",
  },
  {
    name: "Преміум",
    price: "від 15 000 грн",
    tagline: "Емоційний, преміальний рівень",
    days: "15 робочих днів",
    features: [
      "3D-анімація або character animation",
      "Озвучка персонажів",
      "Візитівка бренду / Storytelling, 30–60 сек",
      "Для сайту, презентацій, іміджевої реклами",
    ],
    Illustration: OfficeIllustration,
    highlight: false,
    formatId: "brand",
  },
  {
    name: "Індивідуальний",
    price: "За запитом",
    tagline: "Під ваш унікальний проєкт",
    days: "15+ робочих днів",
    features: [
      "Live-action + анімація або авторський підхід",
      "Будь-яка тривалість і складність",
      "Персональний сценарій та стиль",
      "Обговорюємо деталі на консультації",
    ],
    Illustration: CustomIllustration,
    highlight: false,
    // без preselect — формат тут не фіксований
    formatId: "story",
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-cream py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <h2 className="font-display font-800 text-ink text-3xl sm:text-4xl leading-tight">Тарифи</h2>
          <p className="mt-4 font-body text-ink/70 text-xl leading-relaxed">
            Орієнтовні ціни — точну вартість погодимо на консультації, з урахуванням деталей вашого проєкту.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {tiers.map((t) => {
            const href = t.formatId ? `/?format=${t.formatId}#contact` : "#contact"
            return (
              <div
                key={t.name}
                className={`rounded-3xl overflow-hidden flex flex-col shadow-[0_6px_0_0_theme(colors.meadow.deep)] ${
                  t.highlight ? "bg-ink text-cream ring-2 ring-sun" : "bg-white text-ink"
                }`}
              >
                <div className="relative h-32 shrink-0">
                  <t.Illustration />
                  {t.highlight && (
                    <span className="absolute top-3 left-3 bg-sun text-ink font-body font-700 text-xs px-3 py-1 rounded-full">
                      Популярний вибір
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className={`font-display font-700 text-2xl ${t.highlight ? "text-cream" : "text-ink"}`}>
                    {t.name}
                  </p>
                  <p className={`font-body text-sm mt-1 ${t.highlight ? "text-cream/70" : "text-ink/60"}`}>
                    {t.tagline}
                  </p>
                  <p className={`font-display font-800 text-3xl mt-4 ${t.highlight ? "text-cream" : "text-ink"}`}>
                    {t.price}
                  </p>
                  <p className={`font-body text-sm mt-1 font-700 ${t.highlight ? "text-cream/80" : "text-clay-deep"}`}>
                    Термін виконання: {t.days}
                  </p>

                  <ul className="mt-5 flex-1 space-y-2">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className={`font-body text-sm leading-relaxed flex gap-2 ${
                          t.highlight ? "text-cream/90" : "text-ink/75"
                        }`}
                      >
                        <span aria-hidden="true">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={href}
                    className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 font-body font-700 text-sm transition-colors focus-ring ${
                      t.highlight ? "bg-sun text-ink hover:bg-sun-light" : "bg-meadow text-cream hover:bg-meadow-deep"
                    }`}
                  >
                    Обговорити проєкт
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
