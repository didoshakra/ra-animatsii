// Хвиляста лінія пагорба — сигнатурний елемент бренду, що відсилає
// до пейзажу з логотипу студії.
export default function HillDivider({ fromColor, toColor, flip = false }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full ${flip ? "-scale-y-100" : ""}`}
      style={{ backgroundColor: fromColor, lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="w-full h-[60px] sm:h-[90px]"
      >
        <path
          d="M0,64 C 180,110 340,10 540,40 C 760,73 900,15 1120,48 C 1260,68 1350,30 1440,50 L1440,110 L0,110 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
