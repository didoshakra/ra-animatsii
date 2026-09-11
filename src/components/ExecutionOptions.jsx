"use client"

import { useState } from "react"

export default function ExecutionOptions({ title, options }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="mt-10">
      <p className="font-body font-700 text-cream text-lg mb-1">{title}</p>
      <p className="font-body text-sm text-cream/60 mb-4">Натисніть на варіант, щоб побачити опис</p>
      <div className="flex flex-col gap-2">
        {options.map((o, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={o.title}
              className="bg-cream rounded-2xl overflow-hidden shadow-[0_4px_0_0_theme(colors.meadow.deep)]"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left focus-ring"
              >
                <span className="font-display font-700 text-base sm:text-lg text-ink">{o.title}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={`shrink-0 w-5 h-5 text-meadow-deep transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isOpen && <p className="px-5 pb-4 font-body text-base text-ink/70 leading-relaxed">{o.desc}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
