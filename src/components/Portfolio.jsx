import VideoCase from "./VideoCase"
import VideoCard from "./VideoCard"

const formats = [
  {
    title: "Пояснювальний ролик",
    duration: "60–90 сек",
    desc: "Показуємо, як працює ваш продукт чи послуга, простими картинками замість складних слів.",
    color: "bg-sky-light",
    VIDEO_URL: "/media/portfolio/lumpex24.mp4",
    POSTER_URL: "",
  },
  {
    title: "Ролик  для  соцмереж",
    duration: "15–30 сек",
    desc: "Короткий, яскравий формат під Reels/Shorts — щоб зупинити погляд у стрічці.",
    color: "bg-sun-light",
    VIDEO_URL: "https://res.cloudinary.com/daov9z9qc/video/upload/v1788450019/pictures/hadxijdnt1xqxmy2shee.mp4",
    POSTER_URL: "/media/studio/studio-promo-poster.png",
  },
  {
    title: "Візитівка бренду",
    duration: "45–60 сек",
    desc: "Історія компанії та її цінностей — для головної сторінки сайту чи презентації клієнтам.",
    color: "bg-meadow-light",
    VIDEO_URL: "/media/portfolio/lumpex24.mp4",
    POSTER_URL: "",
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
              videoUrl={f.VIDEO_URL}
              posterUrl={f.POSTER_URL}
              duration={f.duration}
              color={f.color}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
