"use client";

import { useState } from "react";

const FORMATS = [
  { id: "explainer", label: "Пояснювальний ролик" },
  { id: "social", label: "Ролик для соцмереж" },
  { id: "brand", label: "Візитівка бренду" },
];

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [format, setFormat] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      contact: String(data.get("contact") || ""),
      message: String(data.get("message") || ""),
      format: format
        ? FORMATS.find((f) => f.id === format)?.label
        : undefined,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-ink py-20 sm:py-28">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <h2 className="font-display font-800 text-cream text-3xl sm:text-4xl text-center">
          Розкажіть про свій проєкт
        </h2>
        <p className="mt-3 font-body text-lg text-cream/70 text-center">
          Відповімо протягом одного робочого дня.
        </p>

        {status === "sent" ? (
          <div className="mt-10 bg-meadow text-cream rounded-3xl p-8 text-center font-body text-lg">
            Дякуємо! Заявку отримано — скоро з&rsquo;єднаємось із вами.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 grid gap-5">
            <div>
              <label htmlFor="name" className="font-body font-700 text-lg text-cream block mb-1.5">
                Ім&rsquo;я
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-2xl border-2 border-cream/20 bg-cream/5 text-cream px-4 py-3 font-body text-lg focus-ring placeholder:text-cream/40"
                placeholder="Як до вас звертатись"
              />
            </div>

            <div>
              <label htmlFor="contact" className="font-body font-700 text-lg text-cream block mb-1.5">
                Email або телефон
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                required
                className="w-full rounded-2xl border-2 border-cream/20 bg-cream/5 text-cream px-4 py-3 font-body text-lg focus-ring placeholder:text-cream/40"
                placeholder="Куди відповісти"
              />
            </div>

            <div>
              <p className="font-body font-700 text-lg text-cream mb-2">
                Що плануєте?{" "}
                <span className="font-400 text-cream/50 text-base">
                  (необов&rsquo;язково)
                </span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() =>
                      setFormat((cur) => (cur === f.id ? null : f.id))
                    }
                    aria-pressed={format === f.id}
                    className={`font-body font-700 text-sm sm:text-base rounded-full px-4 py-2 border-2 transition-colors focus-ring ${
                      format === f.id
                        ? "bg-sun border-sun text-ink"
                        : "border-cream/25 text-cream/80 hover:border-cream/50"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="font-body font-700 text-lg text-cream block mb-1.5">
                Про проєкт
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-2xl border-2 border-cream/20 bg-cream/5 text-cream px-4 py-3 font-body text-lg focus-ring placeholder:text-cream/40 resize-none"
                placeholder="Що рекламуємо, для кого і коли потрібен ролик"
              />
            </div>

            {status === "error" && (
              <p className="font-body text-sun text-center">
                Щось пішло не так. Спробуйте ще раз або напишіть нам напряму.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="font-display font-700 text-lg bg-sun text-ink rounded-full py-3.5 hover:bg-sun-light transition-colors focus-ring shadow-[0_4px_0_0_theme(colors.clay.deep)] active:translate-y-[3px] active:shadow-none disabled:opacity-60"
            >
              {status === "sending" ? "Надсилаємо…" : "Надіслати заявку"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
