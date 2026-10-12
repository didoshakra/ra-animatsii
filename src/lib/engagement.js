// Збір поведінки в браузері: секції (час, остання), відео, глибина скролу.
// Усе накопичується в пам'яті й відправляється одним пакетом (sendBeacon).
// Сервер робить upsert, тому повторні відправки безпечні.

const SECTION_IDS = [
  "top",
  "studio-video",
  "portfolio",
  "mini-lead",
  "process",
  "about-team",
  "pricing",
  "real-case",
  "contact",
]
const ENDPOINT = "/api/track-engagement"

const state = {
  enabled: false,
  sessionId: null,
  sections: new Map(), // id -> { seconds }
  videos: new Map(), // id -> { label, seconds, percent }
  current: null,
  maxScroll: 0,
  dirty: false,
}

export function getVisitorId() {
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

function getSessionId() {
  if (!state.sessionId) {
    try {
      state.sessionId = crypto.randomUUID()
    } catch {
      state.sessionId = Date.now() + "-" + Math.random().toString(36).slice(2)
    }
  }
  return state.sessionId
}

function setCurrent(id) {
  if (!state.sections.has(id)) state.sections.set(id, { seconds: 0 })
  state.current = id
  state.dirty = true
}

export function recordVideo(id, label, seconds, percent) {
  if (!state.enabled) return
  state.videos.set(id, { label: label || id, seconds, percent })
  state.dirty = true
}

function buildItems() {
  const items = []
  for (const [id, s] of state.sections) {
    items.push({ kind: "section", target: id, label: null, seconds: s.seconds, percent: null, isLast: id === state.current })
  }
  for (const [id, v] of state.videos) {
    items.push({
      kind: "video",
      target: id,
      label: String(v.label || "").slice(0, 120),
      seconds: v.seconds,
      percent: v.percent,
      isLast: false,
    })
  }
  if (state.maxScroll > 0) {
    items.push({ kind: "scroll", target: "page", label: null, seconds: 0, percent: state.maxScroll, isLast: false })
  }
  return items
}

function flush() {
  if (!state.enabled || !state.dirty) return
  const items = buildItems()
  if (items.length === 0) return
  state.dirty = false

  const payload = JSON.stringify({ sessionId: getSessionId(), visitorId: getVisitorId(), items })
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: "application/json" }))) {
      return
    }
  } catch {}
  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {})
}

// Таймери, скрол, відправка при закритті. Викликати один раз.
export function startEngagement() {
  if (state.enabled) return () => {}
  state.enabled = true

  const tick = setInterval(() => {
    if (document.visibilityState !== "visible" || !state.current) return
    state.sections.get(state.current).seconds += 1
    state.dirty = true
  }, 1000)

  const flushTimer = setInterval(flush, 20000)

  const onScroll = () => {
    const total = document.documentElement.scrollHeight
    if (!total) return
    const pct = Math.min(100, Math.round(((window.scrollY + window.innerHeight) / total) * 100))
    if (pct > state.maxScroll) {
      state.maxScroll = pct
      state.dirty = true
    }
  }
  const onHide = () => {
    if (document.visibilityState === "hidden") flush()
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  document.addEventListener("visibilitychange", onHide)
  window.addEventListener("pagehide", flush)
  onScroll()

  return () => {
    clearInterval(tick)
    clearInterval(flushTimer)
    window.removeEventListener("scroll", onScroll)
    document.removeEventListener("visibilitychange", onHide)
    window.removeEventListener("pagehide", flush)
    flush()
    state.enabled = false
  }
}

// Спостерігач за секціями: "поточна" секція = та, що перетинає тонку смугу біля середини екрана.
// Викликати після зміни сторінки (мови), щоб підхопити нові елементи.
export function observeSections() {
  if (!("IntersectionObserver" in window)) return () => {}
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && e.target.id) setCurrent(e.target.id)
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  )
  SECTION_IDS.forEach((id) => {
    const el = document.getElementById(id)
    if (el) io.observe(el)
  })
  return () => io.disconnect()
}
