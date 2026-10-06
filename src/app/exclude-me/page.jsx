//exclude-me/page
"use client"

import { useEffect } from "react"

// Відкрий цю сторінку один раз у кожному своєму браузері/пристрої.
// Бажано перейменуй папку на щось неочевидне, напр. /my-secret-x7k2
export default function ExcludeMe() {
  useEffect(() => {
    document.cookie = "no_track=1; max-age=315360000; path=/; SameSite=Lax"
  }, [])

  return <p>Готово: твої візити більше не рахуються в цьому браузері.</p>
}
