// src/components/PricingCta.jsx
"use client"

// Посилання на #contact. Повідомляє форму, який формат обрати, з якої кнопки клік
// і (необов'язково) який текст підставити в поле «Про проєкт».
export default function PricingCta({ formatId, source, prefill, className, children }) {
  function handleClick() {
    if (formatId || source || prefill) {
      window.dispatchEvent(
        new CustomEvent("select-format", {
          detail: { formatId: formatId || null, source: source || "", prefill: prefill || "" },
        }),
      )
    }
  }

  return (
    <a href="#contact" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
