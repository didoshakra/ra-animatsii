const formats = [
  {
    title: "Пояснювальний ролик",
    duration: "60–90 сек",
    desc: "Показуємо, як працює ваш продукт чи послуга, простими картинками замість складних слів.",
    color: "bg-sky-light",
  },
  {
    title: "Ролик для соцмереж",
    duration: "15–30 сек",
    desc: "Короткий, яскравий формат під Reels/Shorts — щоб зупинити погляд у стрічці.",
    color: "bg-sun-light",
  },
  {
    title: "Візитівка бренду",
    duration: "45–60 сек",
    desc: "Історія компанії та її цінностей — для головної сторінки сайту чи презентації клієнтам.",
    color: "bg-meadow-light",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-meadow py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <h2 className="font-display font-800 text-cream text-3xl sm:text-4xl leading-tight">
            Реальний кейс
          </h2>
          <p className="mt-4 font-body text-cream/90 text-xl leading-relaxed">
            Один із перших роликів студії — для замовника Lumpex24.
          </p>
        </div>

        {/* Featured case: Lumpex24.
            TODO: замінити плейсхолдер на реальне відео, коли буде
            посилання (YouTube embed або файл у /public). */}
        <div className="mt-8 bg-cream rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-[0_6px_0_0_theme(colors.meadow.deep)]">
          <div className="w-full sm:w-64 aspect-video bg-ink/90 rounded-2xl flex items-center justify-center shrink-0">
            <span className="w-16 h-16 rounded-full bg-cream/90 flex items-center justify-center">
              <span className="ml-1 w-0 h-0 border-y-[11px] border-y-transparent border-l-[17px] border-l-ink" />
            </span>
          </div>
          <div>
            <p className="font-display font-700 text-xl text-ink">Lumpex24</p>
            <p className="font-body text-lg text-ink/70 mt-1 leading-relaxed">
              Рекламний ролик для соцмереж — незабаром тут з&rsquo;явиться
              програвач з готовим відео.
            </p>
          </div>
        </div>

        <div className="mt-14 max-w-xl">
          <h3 className="font-display font-700 text-cream text-2xl sm:text-3xl leading-tight">
            Формати, з якими працюємо
          </h3>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {formats.map((f) => (
            <div
              key={f.title}
              className="bg-cream rounded-3xl p-6 flex flex-col shadow-[0_6px_0_0_theme(colors.meadow.deep)]"
            >
              <div
                className={`${f.color} rounded-2xl h-36 flex items-center justify-center mb-5`}
              >
                <span className="w-14 h-14 rounded-full bg-ink/85 flex items-center justify-center">
                  <span className="ml-1 w-0 h-0 border-y-[9px] border-y-transparent border-l-[14px] border-l-cream" />
                </span>
              </div>
              <h3 className="font-display font-700 text-xl text-ink">
                {f.title}
              </h3>
              <p className="font-body text-base text-clay-deep font-700 mt-1">
                {f.duration}
              </p>
              <p className="font-body text-lg text-ink/75 mt-3 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
