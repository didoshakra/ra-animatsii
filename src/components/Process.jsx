const steps = [
  {
    n: "01",
    title: "Бриф і сценарій",
    desc: "Обговорюємо мету ролика та аудиторію, пишемо короткий сценарій і погоджуємо його з вами.",
  },
  {
    n: "02",
    title: "Розкадровка",
    desc: "Малюємо ключові кадри ролика — ви бачите структуру та стиль ще до анімації.",
  },
  {
    n: "03",
    title: "Анімація й озвучення",
    desc: "Оживляємо персонажів, додаємо музику та голос диктора.",
  },
  {
    n: "04",
    title: "Готовий ролик",
    desc: "Передаємо файл у потрібних форматах під сайт, соцмережі чи презентацію.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-cream py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display font-800 text-ink text-3xl sm:text-4xl text-center">
          Шлях від ідеї до ролика
        </h2>

        <div className="mt-14 relative">
          {/* дорога, що з'єднує етапи — відсилає до звивистої стежки на банері студії */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[26px] left-[12.5%] right-[12.5%] h-0 border-t-4 border-dashed border-clay/40"
          />
          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((s) => (
              <div key={s.n} className="relative text-center md:text-left">
                <div className="mx-auto md:mx-0 w-14 h-14 rounded-full bg-clay text-cream font-display font-800 text-lg flex items-center justify-center shadow-[0_4px_0_0_theme(colors.clay.deep)] relative z-10">
                  {s.n}
                </div>
                <h3 className="font-display font-700 text-xl text-ink mt-5">
                  {s.title}
                </h3>
                <p className="font-body text-lg text-ink/75 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
