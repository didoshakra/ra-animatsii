// src/components/MiniLeadForm.jsx
"use client"

import Image from "next/image"
import { useState } from "react"
import { useT } from "next-i18next/client"

const PHONE_RE = /^(\+?38)?0\d{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function isValidPhone(raw) {
  return PHONE_RE.test(raw.replace(/[\s\-()]/g, ""))
}
function isValidEmail(raw) {
  return EMAIL_RE.test(raw.trim())
}

export default function MiniLeadForm() {
  const { t } = useT("common")
  const [status, setStatus] = useState("idle")
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
      setContactError(t("miniLeadForm.missingContactError"))
      setPhoneInvalid(false)
      setEmailInvalid(false)
      return
    }
    if (rawPhone && !phoneOk) {
      setContactError(t("miniLeadForm.invalidPhoneError"))
      setPhoneInvalid(true)
      setEmailInvalid(false)
      form.querySelector('[name="phone"]')?.focus()
      return
    }
    if (rawEmail && !emailOk) {
      setContactError(t("miniLeadForm.invalidEmailError"))
      setEmailInvalid(true)
      setPhoneInvalid(false)
      form.querySelector('[name="email"]')?.focus()
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
      message: "Швидка заявка з міні-форми (після портфоліо)",
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const resJson = await res.json().catch(() => null)

      if (!res.ok) {
        setServerError(resJson?.error || t("miniLeadForm.errorMessage"))
        setStatus("error")
        return
      }

      setStatus("sent")
      form.reset()
    } catch {
      setServerError(t("miniLeadForm.errorMessage"))
      setStatus("error")
    }
  }

  return (
    <section className="bg-meadow-deep py-14 sm:py-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="bg-cream rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 shadow-[0_6px_0_0_theme(colors.ink)]">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
            <Image
              src="/brand/RASpark_eagle.png"
              alt="eagle"
              aria-hidden="true"
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>

          <div className="flex-1 w-full">
            <p className="font-display font-700 text-ink text-xl sm:text-2xl leading-snug">{t("miniLeadForm.title")}</p>
            <p className="font-body text-ink/70 text-base mt-1">{t("miniLeadForm.description")}</p>

            {status === "sent" ? (
              <p className="mt-4 font-body text-lg text-meadow-deep font-700">{t("miniLeadForm.successMessage")}</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={t("miniLeadForm.namePlaceholder")}
                    className="w-full sm:flex-1 rounded-2xl border-2 border-ink/15 bg-white px-4 py-2.5 font-body text-base focus-ring placeholder:text-ink/40"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder={t("miniLeadForm.emailPlaceholder")}
                    aria-invalid={emailInvalid}
                    onChange={() => emailInvalid && setEmailInvalid(false)}
                    className={`w-full sm:flex-1 rounded-2xl border-2 bg-white px-4 py-2.5 font-body text-base focus-ring placeholder:text-ink/40 ${
                      emailInvalid ? "border-red-400" : "border-ink/15"
                    }`}
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder={t("miniLeadForm.phonePlaceholder")}
                    aria-invalid={phoneInvalid}
                    onChange={() => phoneInvalid && setPhoneInvalid(false)}
                    className={`w-full sm:flex-1 rounded-2xl border-2 bg-white px-4 py-2.5 font-body text-base focus-ring placeholder:text-ink/40 ${
                      phoneInvalid ? "border-red-400" : "border-ink/15"
                    }`}
                  />
                </div>
                {contactError && (
                  <p className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-300 px-4 py-2.5 font-body font-700 text-red-600 text-sm">
                    <span aria-hidden="true">⚠</span>
                    {contactError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="font-display font-700 text-cream bg-meadow-deep px-6 py-2.5 rounded-full text-base hover:bg-meadow-deep/90 transition-colors focus-ring disabled:opacity-60"
                >
                  {status === "sending" ? t("miniLeadForm.sendingButton") : t("miniLeadForm.submitButton")}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-2 font-body text-sm text-clay-deep">{serverError || t("miniLeadForm.errorMessage")}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
