// src/lib/attribution.js //збір UTM на час сесії
const KEY = "raspark_attr"
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]

// Зберігає перше входження в сесії (UTM, реферер, перша сторінка).
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return

    const params = new URLSearchParams(window.location.search)
    const data = {}
    UTM_KEYS.forEach((k) => {
      const v = params.get(k)
      if (v) data[k] = v
    })

    let referrer = document.referrer
    try {
      if (referrer && new URL(referrer).host === window.location.host) referrer = ""
    } catch {
      referrer = ""
    }
    data.referrer = referrer
    data.landing = window.location.pathname + window.location.search

    sessionStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // сховище може бути недоступним: просто нічого не зберігаємо
  }
}

export function getAttribution() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}")
  } catch {
    return {}
  }
}
