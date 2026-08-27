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
            Формати, з якими працюємо
          </h2>
          <p className="mt-4 font-body text-cream/90 text-lg leading-relaxed">
            Портфоліо студії поповнюється — тут з&rsquo;являться готові кейси.
            А поки покажемо, які формати роликів ми збираємо для клієнтів.
          </p>
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
              <p className="font-body text-sm text-clay-deep font-700 mt-1">
                {f.duration}
              </p>
              <p className="font-body text-ink/75 mt-3 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
