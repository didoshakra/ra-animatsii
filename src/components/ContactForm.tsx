"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: підключити відправку заявки (напр. API route + Resend),
    // коли будемо готові приймати реальні звернення.
    setSent(true);
  }

  return (
    <section id="contact" className="bg-ink py-20 sm:py-28">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <h2 className="font-display font-800 text-cream text-3xl sm:text-4xl text-center">
          Розкажіть про свій проєкт
        </h2>
        <p className="mt-3 font-body text-cream/70 text-center">
          Відповімо протягом одного робочого дня.
        </p>

        {sent ? (
          <div className="mt-10 bg-meadow text-cream rounded-3xl p-8 text-center font-body text-lg">
            Дякуємо! Заявку отримано — скоро з&rsquo;єднаємось із вами.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 grid gap-5">
            <div>
              <label htmlFor="name" className="font-body font-700 text-cream block mb-1.5">
                Ім&rsquo;я
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-2xl border-2 border-cream/20 bg-cream/5 text-cream px-4 py-3 font-body focus-ring placeholder:text-cream/40"
                placeholder="Як до вас звертатись"
              />
            </div>

            <div>
              <label htmlFor="contact" className="font-body font-700 text-cream block mb-1.5">
                Email або телефон
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                required
                className="w-full rounded-2xl border-2 border-cream/20 bg-cream/5 text-cream px-4 py-3 font-body focus-ring placeholder:text-cream/40"
                placeholder="Куди відповісти"
              />
            </div>

            <div>
              <label htmlFor="message" className="font-body font-700 text-cream block mb-1.5">
                Про проєкт
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-2xl border-2 border-cream/20 bg-cream/5 text-cream px-4 py-3 font-body focus-ring placeholder:text-cream/40 resize-none"
                placeholder="Що рекламуємо, для кого і коли потрібен ролик"
              />
            </div>

            <button
              type="submit"
              className="font-display font-700 text-lg bg-sun text-ink rounded-full py-3.5 hover:bg-sun-light transition-colors focus-ring shadow-[0_4px_0_0_theme(colors.clay.deep)] active:translate-y-[3px] active:shadow-none"
            >
              Надіслати заявку
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
