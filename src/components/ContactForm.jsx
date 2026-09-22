// src/components/ContactForm.jsx
"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useT } from "next-i18next/client"

// const FORMATS = [{ id: "short" }, { id: "ad" }, { id: "brand" }, { id: "story" }]
const FORMATS = [{ id: "short_advertisement" }, { id: "commercial" }, { id: "brand_card" }, { id: "video_story" }]

const PHONE_RE = /^(\+?38)?0\d{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function isValidPhone(raw) {
  return PHONE_RE.test(raw.replace(/[\s\-()]/g, ""))
}
function isValidEmail(raw) {
  return EMAIL_RE.test(raw.trim())
}

function ContactFormInner() {
  const { t } = useT("common")
  const searchParams = useSearchParams()
  const presetFormat = searchParams.get("format")
  const initialFormat = FORMATS.some((f) => f.id === presetFormat) ? presetFormat : null

  const [status, setStatus] = useState("idle")
  const [format, setFormat] = useState(initialFormat)
  const [contactError, setContactError] = useState("")
  const [serverError, setServerError] = useState("")
  const [phoneInvalid, setPhoneInvalid] = useState(false)
  const [emailInvalid, setEmailInvalid] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    const form = e.currentTarget
    const data = new FormData(form)
    const rawEmail = String(data.get("email") || "").trim()
    const rawPhone = String(data.get("phone") || "").trim()

    const phoneOk = rawPhone && isValidPhone(rawPhone)
    const emailOk = rawEmail && isValidEmail(rawEmail)

    if (!rawEmail && !rawPhone) {
      setContactError(t("contactForm.missingContactError"))
      setPhoneInvalid(false)
      setEmailInvalid(false)
      return
    }

    if (rawPhone && !phoneOk) {
      setContactError(t("contactForm.invalidPhoneError"))
      setPhoneInvalid(true)
      setEmailInvalid(false)
      form.querySelector("#phone")?.focus()
      return
    }

    if (rawEmail && !emailOk) {
      setContactError(t("contactForm.invalidEmailError"))
      setEmailInvalid(true)
      setPhoneInvalid(false)
      form.querySelector("#email")?.focus()
      return
    }

    setContactError("")
    setPhoneInvalid(false)
    setEmailInvalid(false)
    setServerError("")
    setStatus("sending")

    const payload = {
      name: String(data.get("name") || ""),
      email: emailOk ? rawEmail : "",
      phone: phoneOk ? rawPhone : "",
      message: String(data.get("message") || ""),
    //   format: format ? t(`contactForm.formats.${format}`) : undefined,
      format: format || undefined,
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const resJson = await res.json().catch(() => null)

      if (!res.ok) {
        setServerError(resJson?.error || t("contactForm.errorMessage"))
        setStatus("error")
        return
      }

      setStatus("sent")
    } catch {
      setServerError(t("contactForm.errorMessage"))
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="bg-ink py-20 sm:py-28">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <h2 className="font-display font-800 text-cream text-3xl sm:text-4xl text-center">
          {t("contactForm.heading")}
        </h2>
        <p className="mt-3 font-body text-lg text-cream/70 text-center">{t("contactForm.subheading")}</p>

        {status === "sent" ? (
          <div className="mt-10 bg-meadow text-cream rounded-3xl p-8 text-center font-body text-lg">
            {t("contactForm.successMessage")}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 grid gap-5">
            <div>
              <label htmlFor="name" className="font-body font-700 text-lg text-cream block mb-1.5">
                {t("contactForm.nameLabel")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-2xl border-2 border-cream/20 bg-cream/5 text-cream px-4 py-3 font-body text-lg focus-ring placeholder:text-cream/40"
                placeholder={t("contactForm.namePlaceholder")}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="font-body font-700 text-lg text-cream block mb-1.5">
                  {t("contactForm.emailLabel")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  aria-invalid={emailInvalid}
                  onChange={() => emailInvalid && setEmailInvalid(false)}
                  className={`w-full rounded-2xl border-2 bg-cream/5 text-cream px-4 py-3 font-body text-lg focus-ring placeholder:text-cream/40 ${
                    emailInvalid ? "border-red-400" : "border-cream/20"
                  }`}
                  placeholder={t("contactForm.emailPlaceholder")}
                />
              </div>
              <div>
                <label htmlFor="phone" className="font-body font-700 text-lg text-cream block mb-1.5">
                  {t("contactForm.phoneLabel")}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  aria-invalid={phoneInvalid}
                  onChange={() => phoneInvalid && setPhoneInvalid(false)}
                  className={`w-full rounded-2xl border-2 bg-cream/5 text-cream px-4 py-3 font-body text-lg focus-ring placeholder:text-cream/40 ${
                    phoneInvalid ? "border-red-400" : "border-cream/20"
                  }`}
                  placeholder={t("contactForm.phonePlaceholder")}
                />
              </div>
            </div>
            {contactError && (
              <p className="-mt-3 flex items-start gap-2 rounded-xl bg-red-500/15 border border-red-400/40 px-4 py-3 font-body font-700 text-red-300 text-base">
                <span aria-hidden="true">⚠</span>
                {contactError}
              </p>
            )}

            <div>
              <p className="font-body font-700 text-lg text-cream mb-2">
                {t("contactForm.formatsLabel")}{" "}
                <span className="font-400 text-cream/50 text-base">{t("contactForm.formatsOptional")}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {FORMATS.map((f) => {
                  const selected = format === f.id
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFormat((cur) => (cur === f.id ? null : f.id))}
                      aria-pressed={selected}
                      className={`font-body font-700 text-sm sm:text-base rounded-full px-4 py-2 border-2 transition-colors focus-ring inline-flex items-center gap-1.5 ${
                        selected ? "bg-sun border-sun text-ink" : "border-cream/25 text-cream/80 hover:border-cream/50"
                      }`}
                    >
                      {selected && <span aria-hidden="true">✓</span>}
                      {t(`contactForm.formats.${f.id}`)}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="font-body font-700 text-lg text-cream block mb-1.5">
                {t("contactForm.messageLabel")}{" "}
                <span className="font-400 text-cream/50 text-base">{t("contactForm.messageOptional")}</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-2xl border-2 border-cream/20 bg-cream/5 text-cream px-4 py-3 font-body text-lg focus-ring placeholder:text-cream/40 resize-none"
                placeholder={t("contactForm.messagePlaceholder")}
              />
            </div>

            {status === "error" && (
              <p className="font-body text-sun text-center">{serverError || t("contactForm.errorMessage")}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="font-display font-700 text-lg bg-sun text-ink rounded-full py-3.5 hover:bg-sun-light transition-colors focus-ring shadow-[0_4px_0_0_theme(colors.clay.deep)] active:translate-y-[3px] active:shadow-none disabled:opacity-60"
            >
              {status === "sending" ? t("contactForm.sendingButton") : t("contactForm.submitButton")}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  )
}
