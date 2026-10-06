//components/PageViewTracker.jsx
"use client"

import { useEffect } from "react"
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

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return
    if (document.cookie.includes("no_track=1")) return

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer,
        visitorId: getVisitorId(),
      }),
      keepalive: true,
    }).catch(() => {})
  }, [pathname])

  return null
}
