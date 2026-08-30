// src/components/Process.jsx
const steps = [
  {
    n: "01",
    icon: "brief",
    title: "Бриф і сценарій",
    desc: "Обговорюємо мету ролика та аудиторію, пишемо короткий сценарій і погоджуємо його з вами.",
  },
  {
    n: "02",
    icon: "storyboard",
    title: "Розкадровка",
    desc: "Малюємо ключові кадри ролика — ви бачите структуру та стиль ще до анімації.",
  },
  {
    n: "03",
    icon: "animation",
    title: "Анімація й озвучення",
    desc: "Оживляємо персонажів, додаємо музику та голос диктора.",
  },
  {
    n: "04",
    icon: "final",
    title: "Готовий ролик",
    desc: "Передаємо файл у потрібних форматах під сайт, соцмережі чи презентацію.",
  },
]

const WHY_POINTS = [
  { title: "Привертає увагу з перших секунд", icon: "spark", bg: "bg-sun" },
  { title: "Пояснює складне за 30–60 секунд", icon: "clock", bg: "bg-sky" },
  { title: "Підвищує довіру й продажі", icon: "heart", bg: "bg-clay" },
  { title: "Працює 24/7 без вихідних", icon: "loop", bg: "bg-meadow-deep" },
]

function WhyIcon({ type }) {
  switch (type) {
    case "spark":
      return <path d="M12 2 L14.2 9 L21 12 L14.2 15 L12 22 L9.8 15 L3 12 L9.8 9 Z" fill="currentColor" />
    case "clock":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </g>
      )
    case "heart":
      return (
        <path
          d="M12 20 C6 15.5 2.5 12 2.5 8.2 C2.5 5.3 4.8 3 7.6 3 C9.4 3 11 3.9 12 5.3 C13 3.9 14.6 3 16.4 3 C19.2 3 21.5 5.3 21.5 8.2 C21.5 12 18 15.5 12 20 Z"
          fill="currentColor"
        />
      )
    case "loop":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 12 a8 8 0 0 1 14-5.3 M20 4v4h-4" />
          <path d="M20 12 a8 8 0 0 1-14 5.3 M4 20v-4h4" />
        </g>
      )
    default:
      return null
  }
}

function StepIcon({ type }) {
  switch (type) {
    case "brief":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <rect x="9" y="2" width="6" height="4" rx="1" />
          <line x1="8" y1="11" x2="16" y2="11" />
          <line x1="8" y1="15" x2="13" y2="15" />
        </g>
      )
    case "storyboard":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.4" fill="currentColor" stroke="none" />
          <path d="M3 16l5-5 4 4 3-3 6 6" />
        </g>
      )
    case "animation":
      return (
        <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <line x1="4" y1="9" x2="4" y2="15" />
          <line x1="8.5" y1="5" x2="8.5" y2="19" />
          <line x1="13" y1="2" x2="13" y2="22" />
          <line x1="17.5" y1="5" x2="17.5" y2="19" />
          <line x1="21" y1="9" x2="21" y2="15" />
        </g>
      )
    case "final":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <rect x="3" y="9" width="18" height="12" rx="2" />
          <path d="M3 9l2-5h4l-2 5z" />
          <path d="M9 9l2-5h4l-2 5z" />
          <path d="M15 9l2-5h3l-2 5z" />
        </g>
      )
    default:
      return null
  }
}

export default function Process() {
  return (
    <section id="process" className="bg-cream py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="font-display font-700 text-clay-deep text-center uppercase tracking-wide text-sm">
          Навіщо анімація?
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {WHY_POINTS.map((point) => (
            <div key={point.title} className="flex flex-col items-center text-center gap-3">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${point.bg} text-cream flex items-center justify-center shadow-[0_4px_0_0_rgba(47,36,22,0.25)]`}
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-9 sm:h-9">
                  <WhyIcon type={point.icon} />
                </svg>
              </div>
              <p className="font-body font-700 text-sm sm:text-base text-ink/85 leading-snug max-w-[10rem]">
                {point.title}
              </p>
            </div>
          ))}
        </div>

        <h2 className="font-display font-800 text-ink text-3xl sm:text-4xl text-center mt-16">
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
                <div className="mx-auto md:mx-0 w-14 h-14 rounded-full bg-clay text-cream flex items-center justify-center shadow-[0_4px_0_0_theme(colors.clay.deep)] relative z-10">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <StepIcon type={s.icon} />
                  </svg>
                </div>
                <h3 className="font-display font-700 text-xl text-ink mt-5">{s.title}</h3>
                <p className="font-body text-lg text-ink/75 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
