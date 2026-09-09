import VideoCase from "./VideoCase"
import VideoCard from "./VideoCard"

const formats = [
  {
    title: "01. Коротка реклама",
    duration: "10–15 сек",
    desc: "Зачепити увагу з перших секунд, показати продукт і дати чітку причину звернути увагу саме на нього.",
    structure: "Hook → товар/послуга → вигода → CTA",
    suitableFor: "Підходить для Reels, TikTok, YouTube Shorts та таргетованої реклами.",
    color: "bg-sky-light",
    playAspect: "16:9",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788965604/pictures/tecdcduffhrzpao2ifvn.mp4",
    POSTER_URL: "",
  },
  {
    title: "02. Рекламний ролик",
    duration: "20–30 сек",
    desc: "Невелика історія, яка показує проблему клієнта, пропонує рішення та підводить до дії.",
    structure: "Міні-сюжет → проблема → рішення → бренд → CTA",
    suitableFor: "Підходить для соцмереж, YouTube, Meta Ads та рекламних кампаній.",
    color: "bg-sun-light",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788965660/pictures/myxlcznejrhh9xbj55m6.mp4",
    POSTER_URL: "",
    playAspect: "9:16",
  },
  {
    title: "03. Візитівка бренду",
    duration: "30–60 сек",
    desc: "Коротко та яскраво розповідаємо, хто ви, чим займаєтесь і чому саме ваш бренд вартий уваги.",
    structure: "Хто ми → що робимо → чому ми → емоційне завершення",
    suitableFor: "Підходить для сайту, соцмереж, презентацій та іміджевої реклами.",
    color: "bg-meadow-light",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788688441/pictures/ynyyoxasgdxbdphhkjfe.mp4",
    POSTER_URL: "",
    playAspect: "16:9",
  },
  {
    title: "04. Storytelling",
    duration: "30–60 сек",
    desc: "Перетворюємо рекламу на маленьку історію, яку хочеться додивитися до кінця. Персонажі, сюжет і емоції працюють на ваш бренд.",
    structure: "Персонаж → ситуація → конфлікт → рішення → бренд",
    suitableFor: "Підходить для креативної реклами, соцмереж, YouTube та побудови впізнаваності бренду.",
    color: "bg-sky-light",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788688441/pictures/ynyyoxasgdxbdphhkjfe.mp4",
    POSTER_URL: "",
    playAspect: "16:9",
  },
]

const voiceoverOptions = [
  {
    title: "Без озвучки",
    desc: "Музика, звукові ефекти, анімація та текст на екрані.",
  },
  {
    title: "Закадрова озвучка",
    desc: "Професійний голос розповідає історію та підкреслює основні переваги продукту.",
  },
  {
    title: "Озвучка персонажів",
    desc: "Персонажі спілкуються між собою, жартують і розповідають історію — для більш живої та емоційної реклами.",
  },
]

const styleOptions = [
  {
    title: "2D-анімація",
    desc: "Яскравий, легкий і динамічний стиль. Чудово підходить для соцмереж, пояснювальних та креативних рекламних роликів.",
  },
  {
    title: "3D-анімація",
    desc: "Об'ємна графіка, реалістичні матеріали, ефектні сцени та сучасний вигляд. Підходить для презентації продуктів, технологій та преміальних брендів.",
  },
  {
    title: "Character animation",
    desc: "Стилізовані персонажі з живою мімікою та рухом — для емоційних історій та впізнаваних маскотів бренду.",
  },
  {
    title: "Live-action + анімація",
    desc: "Поєднання живої зйомки з графікою — коли потрібен реальний продукт чи люди в кадрі разом з анімаційними акцентами.",
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-meadow py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <h2 className="font-display font-800 text-cream text-3xl sm:text-4xl leading-tight">Реальний кейс</h2>
          <p className="mt-4 font-body text-cream/90 text-xl leading-relaxed">
            Один із роликів студії — для замовника.
          </p>
        </div>

        {/* Featured cases */}
        <VideoCase />

        <div className="mt-14 max-w-xl">
          <h3 className="font-display font-700 text-cream text-2xl sm:text-3xl leading-tight">
            Формати, з якими працюємо
          </h3>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6 items-start">
          {formats.map((f) => (
            <VideoCard
              key={f.title}
              title={f.title}
              desc={f.desc}
              structure={f.structure}
              suitableFor={f.suitableFor}
              videoUrl={f.VIDEO_URL}
              posterUrl={f.POSTER_URL}
              duration={f.duration}
              color={f.color}
              playAspect={f.playAspect}
            />
          ))}
        </div>

        <div className="mt-14 max-w-xl">
          <h3 className="font-display font-700 text-cream text-2xl sm:text-3xl leading-tight">Варіанти виконання</h3>
        </div>

        <div className="mt-10">
          <p className="font-body font-700 text-cream text-lg mb-4">🎙 Озвучка</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {voiceoverOptions.map((o) => (
              <div key={o.title} className="bg-cream rounded-3xl p-6 shadow-[0_6px_0_0_theme(colors.meadow.deep)]">
                <p className="font-display font-700 text-lg text-ink">{o.title}</p>
                <p className="font-body text-base text-ink/70 mt-2 leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="font-body font-700 text-cream text-lg mb-4">🎨 Стиль</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {styleOptions.map((o) => (
              <div key={o.title} className="bg-cream rounded-3xl p-6 shadow-[0_6px_0_0_theme(colors.meadow.deep)]">
                <p className="font-display font-700 text-lg text-ink">{o.title}</p>
                <p className="font-body text-base text-ink/70 mt-2 leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
