"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      contact: String(data.get("contact") || ""),
      message: String(data.get("message") || ""),
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
