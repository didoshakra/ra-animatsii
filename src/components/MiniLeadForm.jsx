"use client";

import Image from "next/image";
import { useState } from "react";

export default function MiniLeadForm() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      contact: String(data.get("contact") || ""),
      message: "Швидка заявка з міні-форми (після портфоліо)",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-meadow-deep py-14 sm:py-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="bg-cream rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 shadow-[0_6px_0_0_theme(colors.ink)]">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
            <Image
              src="/brand/eagle.png"
              alt=""
              aria-hidden="true"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex-1 w-full">
            <p className="font-display font-700 text-ink text-xl sm:text-2xl leading-snug">
              Хочете такий ролик?
            </p>
            <p className="font-body text-ink/70 text-base mt-1">
              Залиште ім&rsquo;я й контакт — відповімо протягом дня.
            </p>

            {status === "sent" ? (
              <p className="mt-4 font-body text-lg text-meadow-deep font-700">
                Дякуємо! Заявку отримано — скоро з&rsquo;єднаємось.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-4 flex flex-col xs:flex-row gap-3"
              >
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Ім'я"
                  className="w-full xs:w-auto xs:flex-1 rounded-2xl border-2 border-ink/15 bg-white px-4 py-2.5 font-body text-base focus-ring placeholder:text-ink/40"
                />
                <input
                  name="contact"
                  type="text"
                  required
                  placeholder="Email або телефон"
                  className="w-full xs:w-auto xs:flex-1 rounded-2xl border-2 border-ink/15 bg-white px-4 py-2.5 font-body text-base focus-ring placeholder:text-ink/40"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="font-display font-700 text-cream bg-meadow-deep px-6 py-2.5 rounded-full text-base hover:bg-meadow-deep/90 transition-colors focus-ring shrink-0 disabled:opacity-60"
                >
                  {status === "sending" ? "Надсилаємо…" : "Надіслати"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-2 font-body text-sm text-clay-deep">
                Щось пішло не так. Спробуйте ще раз.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
