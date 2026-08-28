// Прості векторні ілюстрації в стилі бренду — замість фотографій,
// щоб уникнути ліцензійних питань і зберегти казковий стиль сайту.

export function ManicureIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden="true">
      <rect width="200" height="140" rx="18" fill="#CDEBF9" />
      {/* долоня */}
      <path
        d="M70 95 C62 95 58 85 60 70 L64 45 C64.5 41 70 41 70.5 45 L72 68"
        fill="none"
        stroke="#8C4F2C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M72 68 L73 40 C73.5 36 79 36 79.5 40 L80 68"
        fill="none"
        stroke="#8C4F2C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M80 68 L81 42 C81.5 38 87 38 87.5 42 L88 69"
        fill="none"
        stroke="#8C4F2C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M88 69 L90 48 C90.5 44.5 95.5 45 95.5 48.5 L95 70"
        fill="none"
        stroke="#8C4F2C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M60 70 C50 74 46 84 52 94 C58 104 82 106 92 96 C98 90 97 76 95 70"
        fill="#FBF6E9"
        stroke="#8C4F2C"
        strokeWidth="3"
      />
      {/* нафарбовані нігтики */}
      <circle cx="70.5" cy="44" r="3.2" fill="#C97A4A" />
      <circle cx="73" cy="39" r="3.2" fill="#C97A4A" />
      <circle cx="81" cy="41" r="3.2" fill="#C97A4A" />
      <circle cx="90" cy="47" r="3.2" fill="#C97A4A" />

      {/* флакон лаку */}
      <rect x="118" y="60" width="26" height="34" rx="6" fill="#FFC94D" stroke="#8C4F2C" strokeWidth="2.5" />
      <rect x="126" y="48" width="10" height="14" rx="2" fill="#5FA653" stroke="#8C4F2C" strokeWidth="2.5" />
      <rect x="123" y="70" width="16" height="16" rx="3" fill="#FBF6E9" opacity="0.5" />
    </svg>
  );
}

export function CafeIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden="true">
      <rect width="200" height="140" rx="18" fill="#FFE29B" />
      {/* пара */}
      <path d="M85 40 C82 32 90 30 87 22" fill="none" stroke="#8C4F2C" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 40 C97 32 105 30 102 22" fill="none" stroke="#8C4F2C" strokeWidth="3" strokeLinecap="round" />
      {/* чашка */}
      <path
        d="M62 55 H118 L112 100 C111 108 100 113 90 113 C80 113 69 108 68 100 Z"
        fill="#FBF6E9"
        stroke="#8C4F2C"
        strokeWidth="3"
      />
      <ellipse cx="90" cy="55" rx="28" ry="7" fill="#8C4F2C" />
      <ellipse cx="90" cy="55" rx="22" ry="4.5" fill="#C97A4A" />
      <path
        d="M118 62 C134 62 134 86 118 86"
        fill="none"
        stroke="#8C4F2C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* тарілка з випічкою */}
      <ellipse cx="150" cy="108" rx="30" ry="8" fill="#FBF6E9" stroke="#8C4F2C" strokeWidth="2.5" />
      <path
        d="M136 100 C136 90 144 84 152 84 C160 84 166 90 166 100 Z"
        fill="#C97A4A"
        stroke="#8C4F2C"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export function OfficeIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden="true">
      <rect width="200" height="140" rx="18" fill="#B9DDA8" />
      {/* будівля */}
      <rect x="118" y="24" width="58" height="92" rx="4" fill="#FBF6E9" stroke="#8C4F2C" strokeWidth="3" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={128 + col * 16}
            y={34 + row * 20}
            width="10"
            height="12"
            rx="1.5"
            fill="#6FC3E8"
          />
        ))
      )}
      {/* стіл + монітор */}
      <rect x="18" y="98" width="76" height="8" rx="2" fill="#8C4F2C" />
      <rect x="24" y="106" width="6" height="14" fill="#8C4F2C" />
      <rect x="82" y="106" width="6" height="14" fill="#8C4F2C" />
      <rect x="38" y="66" width="34" height="26" rx="3" fill="#2F2416" />
      <rect x="41" y="69" width="28" height="18" rx="2" fill="#6FC3E8" />
      <rect x="50" y="92" width="10" height="6" fill="#2F2416" />
      {/* рослина */}
      <rect x="96" y="100" width="12" height="12" rx="2" fill="#C97A4A" />
      <circle cx="102" cy="90" r="10" fill="#5FA653" />
      <circle cx="94" cy="95" r="7" fill="#5FA653" />
      <circle cx="110" cy="95" r="7" fill="#5FA653" />
    </svg>
  );
}
