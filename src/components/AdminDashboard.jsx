"use client"

import { useEffect, useState } from "react"

const PERIODS = [7, 30, 90]

function Card({ label, value }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white/70 p-4">
      <div className="text- opacity-60">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value ?? "—"}</div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-black/10 bg-white/70 p-4">
      <h2 className="mb-3 text-base font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function BarList({ rows, extra }) {
  if (!rows || rows.length === 0) return <p className="text-base opacity-50">Поки немає даних</p>
  const max = Math.max(1, ...rows.map((r) => r.views))
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.name} className="text-base">
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
      <div className="mt-1 flex justify-between text-sm opacity-50">
        <span>{daily[0].day}</span>
        <span>макс. {max} / день</span>
        <span>{daily[daily.length - 1].day}</span>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [days, setDays] = useState(7)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null) // 'denied' | 'error'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(`/api/stats?days=${days}`, { cache: "no-store" })
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
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [days])

  if (error === "denied") {
    return <main className="p-6 text-base">Немає доступу.</main>
  }
  if (error === "error") {
    return <main className="p-6 text-base">Не вдалося завантажити статистику. Спробуй оновити сторінку.</main>
  }

  const s = data?.summary

  return (
    <main className="mx-auto max-w-5xl space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">📊 Статистика сайту</h1>
        <div className="flex gap-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setDays(p)}
              className={`rounded-lg border border-black/10 px-3 py-1 text-base ${
                days === p ? "bg-black text-white" : "bg-white/70"
              }`}
            >
              {p} днів
            </button>
          ))}
        </div>
      </div>

      {loading && !data && <p className="text-base opacity-60">Завантаження…</p>}

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
          </div>

          <Section title="Останні 20 переглядів">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="opacity-60">
                  <tr>
                    <th className="pb-2 pr-3">Час</th>
                    <th className="pb-2 pr-3">Сторінка</th>
                    <th className="pb-2 pr-3">Джерело</th>
                    <th className="pb-2">Країна</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent.map((r, i) => (
                    <tr key={i} className="border-t border-black/5">
                      <td className="whitespace-nowrap py-1 pr-3">{new Date(r.created_at).toLocaleString("uk-UA")}</td>
                      <td className="py-1 pr-3">{r.path}</td>
                      <td className="max-w-[220px] truncate py-1 pr-3">{r.referrer || "—"}</td>
                      <td className="py-1">{r.country || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      )}
    </main>
  )
}
