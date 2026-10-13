//lib/useVideoTracking.js
"use client"

import { useEffect } from "react"
import { recordVideo } from "./engagement"

// ID відео = ім'я файла в Cloudinary (без розширення)
export function videoIdFromUrl(url) {
  return String(url || "")
    .split("?")[0]
    .split("/")
    .pop()
    .replace(/\.\w+$/, "")
}

// Рахує реально переглянуті секунди (без перемотувань) і максимальний % перегляду.
export function useVideoTracking(videoRef, url, label) {
  useEffect(() => {
    const el = videoRef.current
    if (!el || !url) return

    const id = videoIdFromUrl(url)
    let watched = 0
    let last = null
    let maxPct = 0

    const report = () => {
      if (watched >= 1) recordVideo(id, label, Math.round(watched), maxPct)
    }
    const onTime = () => {
      const t = el.currentTime
      if (last !== null) {
        const d = t - last
        if (d > 0 && d < 1.5) watched += d
      }
      last = t
      if (el.duration) maxPct = Math.max(maxPct, Math.min(100, Math.round((t / el.duration) * 100)))
      report()
    }
    const reset = () => {
      last = null
    }
    const onEnded = () => {
      maxPct = 100
      last = null
      report()
    }

    el.addEventListener("timeupdate", onTime)
    el.addEventListener("seeking", reset)
    el.addEventListener("pause", reset)
    el.addEventListener("play", reset)
    el.addEventListener("ended", onEnded)
    return () => {
      el.removeEventListener("timeupdate", onTime)
      el.removeEventListener("seeking", reset)
      el.removeEventListener("pause", reset)
      el.removeEventListener("play", reset)
      el.removeEventListener("ended", onEnded)
      report()
    }
  }, [videoRef, url, label])
}
