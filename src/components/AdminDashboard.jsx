// components/AdminDashboard.jsx
"use client"

import { useEffect, useState } from "react"

const PERIODS = [7, 30, 90]

const SECTION_NAMES = {
  top: "Головна",
  "studio-video": "Відео студії",
  portfolio: "Портфоліо",
  "mini-lead": "Міні-форма",
  process: "Як працюємо",
  "about-team": "Команда",
  pricing: "Тарифи",
  "real-case": "Приклади",
  contact: "Контакти",
}
const sectionName = (id) => SECTION_NAMES[id] || id

function Card({ label, value }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white/70 p-4">
      <div className="text-xs opacity-60">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value ?? "—"}</div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-black/10 bg-white/70 p-4">
      <h2 className="mb-3 text-sm font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function BarList({ rows, extra }) {
  if (!rows || rows.length === 0) return <p className="text-sm opacity-50">Поки немає даних</p>
  const max = Math.max(1, ...rows.map((r) => r.views))
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.name} className="text-sm">
          <div className="flex justify-between gap-3">
            <span className="truncate">{r.name || "—"}</span>
            <span className="shrink-0 tabular-nums">
              {r.views}
              {extra ? ` · ${r[extra]}` : ""}
            </span>
          </div>
          <div className="mt-1 h-1.5 rounded bg-black/10">
            <div className="h-1.5 rounded bg-black/50" style={{ width: `${(r.views / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

// Секції: скільки візитів дійшло, середній час, скільки разів вийшли з цієї секції
function SectionsList({ rows }) {
  if (!rows || rows.length === 0) return <p className="text-sm opacity-50">Поки немає даних</p>
  const max = Math.max(1, ...rows.map((r) => r.views))
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.name} className="text-sm">
          <div className="flex justify-between gap-3">
            <span className="truncate">{sectionName(r.name)}</span>
            <span className="shrink-0 tabular-nums">
              {r.views} візитів · ~{r.avg_seconds}с · вийшли: {r.exits}
            </span>
          </div>
          <div className="mt-1 h-1.5 rounded bg-black/10">
            <div className="h-1.5 rounded bg-black/50" style={{ width: `${(r.views / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

function VideosList({ rows }) {
  if (!rows || rows.length === 0) return <p className="text-sm opacity-50">Поки ніхто не дивився</p>
  const max = Math.max(1, ...rows.map((r) => r.views))
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.id} className="text-sm">
          <div className="flex justify-between gap-3">
            <span className="truncate">{r.name || r.id}</span>
            <span className="shrink-0 tabular-nums">
              {r.views} · ~{r.avg_seconds}с · ~{r.avg_percent}%
            </span>
          </div>
          <div className="mt-1 h-1.5 rounded bg-black/10">
            <div className="h-1.5 rounded bg-black/50" style={{ width: `${(r.views / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

function DailyChart({ daily }) {
  if (!daily || daily.length === 0) return null
  const W = 600
  const H = 150
  const max = Math.max(1, ...daily.map((d) => d.views))
  const step = W / daily.length
  const barW = Math.max(2, step * 0.7)

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H + 4}`} className="w-full" role="img" aria-label="Перегляди по днях">
        {daily.map((d, i) => {
          const h = (d.views / max) * H
          return (
            <rect
              key={d.day}
              x={i * step + (step - barW) / 2}
              y={H - h}
              width={barW}
              height={Math.max(h, d.views > 0 ? 2 : 0)}
              rx="2"
              fill="currentColor"
              opacity="0.55"
            >
              <title>{`${d.day}: ${d.views} переглядів, ${d.visitors} відвідувачів`}</title>
            </rect>
          )
        })}
      </svg>
      <div className="mt-1 flex justify-between text-xs opacity-50">
        <span>{daily[0].day}</span>
        <span>макс. {max} / день</span>
        <span>{daily[daily.length - 1].day}</span>
      </div>
    </div>
  )
}

function Sessions({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return <p className="text-sm opacity-50">Поки немає даних (збираються з моменту оновлення сайту)</p>
  }
  return (
    <ul className="space-y-3">
      {sessions.map((s) => (
        <li key={s.session_id} className="rounded-lg border border-black/5 bg-white/60 p-3 text-xs">
          <div className="flex flex-wrap justify-between gap-2 opacity-70">
            <span>
              {new Date(s.last_at).toLocaleString("uk-UA")} · {s.country || "—"} · браузер{" "}
              {String(s.visitor_id || "—").slice(0, 6)}
            </span>
            <span>скрол до {s.scroll ?? 0}%</span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
            {s.sections.length === 0 && <span className="opacity-50">секції не фіксувались</span>}
            {s.sections.map((sec, i) => (
              <span key={sec.id} className="flex items-center gap-1.5">
                {i > 0 && <span className="opacity-40">→</span>}
                <span className={sec.is_last ? "font-semibold" : ""}>
                  {sectionName(sec.id)} {sec.seconds}с{sec.is_last ? " (вийшов)" : ""}
                </span>
              </span>
            ))}
          </div>

          {s.videos.length > 0 && (
            <ul className="mt-2 space-y-0.5 text-sm">
              {s.videos.map((v) => (
                <li key={v.id}>
                  ▶ {v.label || v.id} — {v.seconds}с, {v.percent ?? 0}%
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function AdminDashboard() {
  const [days, setDays] = useState(7)
  const [filter, setFilter] = useState("all") // 'all' | 'clean'
  const [data, setData] = useState(null)
  const [error, setError] = useState(null) // 'denied' | 'error'

  // Завантаження виводимо з даних: поки відповідь не збігається з обраним періодом/фільтром
  const loading = !data || data.days !== days || data.filter !== filter

  useEffect(() => {
    let cancelled = false

    fetch(`/api/stats?days=${days}&filter=${filter}`, { cache: "no-store" })
      .then((r) => {
        if (r.status === 404) throw new Error("denied")
        if (!r.ok) throw new Error("error")
        return r.json()
      })
      .then((d) => {
        if (cancelled) return
        setData(d)
        setError(null)
      })
      .catch((e) => {
        if (!cancelled) setError(e.message === "denied" ? "denied" : "error")
      })

    return () => {
      cancelled = true
    }
  }, [days, filter])

  if (error === "denied") {
    return <main className="p-6 text-sm">Немає доступу.</main>
  }
  if (error === "error") {
    return <main className="p-6 text-sm">Не вдалося завантажити статистику. Спробуй оновити сторінку.</main>
  }

  const s = data?.summary

  return (
    <main className="mx-auto max-w-5xl space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">📊 Статистика сайту</h1>
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1">
            {[
              ["all", "Всі"],
              ["clean", "Без підозрілих"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-lg border border-black/10 px-3 py-1 text-sm ${
                  filter === key ? "bg-black text-white" : "bg-white/70"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setDays(p)}
                className={`rounded-lg border border-black/10 px-3 py-1 text-sm ${
                  days === p ? "bg-black text-white" : "bg-white/70"
                }`}
              >
                {p} днів
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && !data && <p className="text-sm opacity-60">Завантаження…</p>}

      {data && (
        <div className={loading ? "space-y-4 opacity-60" : "space-y-4"}>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Card label="Сьогодні" value={s.today} />
            <Card label="Останні 7 днів" value={s.week} />
            <Card label={`За ${data.days} днів`} value={`${s.period_views} / ${s.period_visitors} унік.`} />
            <Card label="Усього" value={`${s.total} / ${s.visitors_total} унік.`} />
          </div>

          <Section title={`Перегляди по днях (${data.days} днів)`}>
            <DailyChart daily={data.daily} />
          </Section>

          <div className="grid gap-4 md:grid-cols-2">
            <Section title="Топ сторінок">
              <BarList rows={data.pages} />
            </Section>
            <Section title="Звідки приходять">
              <BarList rows={data.sources} />
            </Section>
            <Section title="Країни (перегляди · унікальні)">
              <BarList rows={data.countries} extra="visitors" />
            </Section>
            <Section title="Мови сайту">
              <BarList rows={data.langs} />
            </Section>
            <Section title="Секції (візитів · середній час · виходів)">
              <SectionsList rows={data.topSections} />
            </Section>
            <Section title="Відео (глядачів · сер. час · сер. %)">
              <VideosList rows={data.topVideos} />
            </Section>
          </div>

          <Section title="Поведінка: останні 15 візитів">
            <Sessions sessions={data.sessions} />
          </Section>

          <Section title="Останні 20 переглядів">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="opacity-60">
                  <tr>
                    <th className="pb-2 pr-3">Час</th>
                    <th className="pb-2 pr-3">Тип</th>
                    <th className="pb-2 pr-3">Сторінка</th>
                    <th className="pb-2 pr-3">Джерело</th>
                    <th className="pb-2 pr-3">Країна</th>
                    <th className="pb-2">Браузер (User-Agent)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent.map((r, i) => (
                    <tr key={i} className="border-t border-black/5">
                      <td className="whitespace-nowrap py-1 pr-3">{new Date(r.created_at).toLocaleString("uk-UA")}</td>
                      <td
                        className="py-1 pr-3 text-center font-semibold"
                        title={r.suspicious ? "Підозрілий: 3+ перегляди з одного браузера за 30 с" : ""}
                      >
                        {r.suspicious ? "*" : ""}
                      </td>
                      <td className="py-1 pr-3">{r.path}</td>
                      <td className="max-w-[220px] truncate py-1 pr-3">{r.referrer || "—"}</td>
                      <td className="py-1 pr-3">{r.country || "—"}</td>
                      <td className="max-w-[260px] truncate py-1" title={r.user_agent || ""}>
                        {r.user_agent || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs opacity-60">
              * — підозрілий: 3 і більше переглядів з одного браузера за 30 секунд.
            </p>
          </Section>
        </div>
      )}
    </main>
  )
}
