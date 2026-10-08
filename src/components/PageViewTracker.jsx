"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

function getVisitorId() {
  try {
    let id = localStorage.getItem("vid")
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem("vid", id)
    }
    return id
  } catch {
    return ""
  }
}

export default function PageViewTracker() {
  const pathname = usePathname()
  const prevPath = useRef(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return
    if (document.cookie.includes("no_track=1")) return

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

  return null
}
