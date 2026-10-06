"use client"

import { useEffect, useState } from "react"

// Показується тільки якщо в браузері є cookie no_track=1
// (ставиться сторінкою /exclude-me). Звичайні відвідувачі нічого не бачать.
export default function AdminStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (!document.cookie.includes("no_track=1")) return

    fetch("/api/views")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setStats(data))
      .catch(() => {})
  }, [])

  if (!stats) return null

  return (
    <div className="py-2 text-center text-xs opacity-60">
      👁 {stats.total} переглядів · 👤 {stats.visitors} відвідувачів · сьогодні {stats.today} · 7 днів {stats.week}
    </div>
  )
}
