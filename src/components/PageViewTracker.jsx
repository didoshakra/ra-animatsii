// components/PageViewTracker.jsx
"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { getVisitorId, startEngagement, observeSections } from "@/lib/engagement"

function trackingAllowed() {
  if (process.env.NODE_ENV !== "production") return false
  if (document.cookie.includes("no_track=1")) return false
  return true
}

export default function PageViewTracker() {
  const pathname = usePathname()
  const prevPath = useRef(null)

  // Перегляди сторінок
  useEffect(() => {
    if (!trackingAllowed()) return

    // Перша сторінка візиту: справжнє джерело (Google, Instagram тощо).
    // Далі: попередня сторінка цього ж сайту, щоб джерело не повторювалось.
    const referrer = prevPath.current === null ? document.referrer : window.location.origin + prevPath.current
    prevPath.current = pathname

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer,
        visitorId: getVisitorId(),
      }),
      keepalive: true,
    }).catch(() => {})
  }, [pathname])

  // Таймери, скрол, відправка при закритті вкладки (один раз)
  useEffect(() => {
    if (!trackingAllowed()) return
    return startEngagement()
  }, [])

  // Спостерігач за секціями; перепідключається при зміні сторінки/мови
  useEffect(() => {
    if (!trackingAllowed()) return
    let stop = null
    const timer = setTimeout(() => {
      stop = observeSections()
    }, 300)
    return () => {
      clearTimeout(timer)
      if (stop) stop()
    }
  }, [pathname])

  return null
}
