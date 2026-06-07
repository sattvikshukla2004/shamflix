// ============================================================
// src/components/features/CherryBlossoms.jsx
// Animated falling cherry blossom petals.
// Only rendered in Sattvik's profile (pastel pink theme).
// ============================================================

import { useEffect, useRef } from 'react';

// A single petal SVG shape
function PetalShape({ color, size, opacity }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: 'block', opacity }}
    >
      <path
        d="M12 2 C12 2, 18 6, 18 12 C18 17, 14 20, 12 22 C10 20, 6 17, 6 12 C6 6, 12 2, 12 2Z"
        fill={color}
      />
    </svg>
  );
}

// Generate random petals config
const PETAL_CONFIGS = Array.from({ length: 28 }, (_, i) => {
  const colors = ['#FFB6C1', '#FF85A1', '#FFADC5', '#FFC0CB', '#FF69B4', '#FFD6E4'];
  return {
    id: i,
    color: colors[i % colors.length],
    size: 10 + (i % 5) * 4,   // 10–26px
    left: `${(i * 3.7 + Math.sin(i * 1.3) * 12 + 50) % 100}%`,
    animDuration: `${7 + (i % 5) * 2}s`,
    animDelay: `${-(i * 0.8)}s`,
    opacity: 0.35 + (i % 4) * 0.12,
    drift: (i % 3 === 0 ? 1 : -1) * (20 + (i % 4) * 15),
  };
});

export default function CherryBlossoms() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {PETAL_CONFIGS.map((petal) => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            top: '-40px',
            left: petal.left,
            animation: `cherryFall ${petal.animDuration} ${petal.animDelay} linear infinite`,
            '--drift': `${petal.drift}px`,
          }}
        >
          <PetalShape
            color={petal.color}
            size={petal.size}
            opacity={petal.opacity}
          />
        </div>
      ))}
    </div>
  );
}
