import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink py-8 border-t border-cream/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Image
            src="/brand/eagle.png"
            alt="RA Анімації"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-display font-700 text-cream">RA Анімації</span>
        </div>
        <p className="font-body text-cream/50 text-sm">
          © {new Date().getFullYear()} RA Анімації. Усі права захищено.
        </p>
      </div>
    </footer>
  );
}
