import Image from "next/image";

export default function AboutTeam() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display font-800 text-ink text-3xl sm:text-4xl leading-tight">
            Команда персонажів на вашому боці
          </h2>
          <p className="mt-4 font-body text-lg text-ink/75 leading-relaxed">
            За кожним роликом стоїть команда — сценарист, аніматор і
            озвучення працюють разом, щоб історія вашого бізнесу заговорила
            мовою анімації.
          </p>
        </div>

        <div className="mt-10 rounded-3xl overflow-hidden shadow-[0_8px_0_0_theme(colors.clay.deep)]">
          <Image
            src="/brand/og-image.jpg"
            alt="Команда персонажів студії RA Анімації разом із засновником в мультяшному офісі"
            width={1424}
            height={752}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
