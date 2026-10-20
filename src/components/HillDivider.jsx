//GPT20261020// src/components/HillDivider.jsx

// Компактна фірмова хвиля RA Spark.
export default function HillDivider({ fromColor, toColor, flip = false, compact = false }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full ${flip ? "-scale-y-100" : ""}`}
      style={{ backgroundColor: fromColor, lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className={`w-full ${compact ? "h-6 sm:h-8" : "h-8 sm:h-12"}`}
      >
        <path
          d="M0,64 C180,110 340,10 540,40 C760,73 900,15 1120,48 C1260,68 1350,30 1440,50 L1440,110 L0,110 Z"
          fill={toColor}
        />
      </svg>
    </div>
  )
}
