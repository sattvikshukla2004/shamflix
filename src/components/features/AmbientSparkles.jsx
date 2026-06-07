// src/components/features/AmbientSparkles.jsx
// Subtle floating sparkles in the background. Just vibes.
import { useEffect, useRef } from 'react';

const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 4 + Math.random() * 8,
  duration: 6 + Math.random() * 8,
  delay: Math.random() * 6,
  opacity: 0.08 + Math.random() * 0.12,
  symbol: ['✦', '✧', '·', '⋆', '✦'][Math.floor(Math.random() * 5)],
}));

export default function AmbientSparkles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {SPARKLES.map(s => (
        <span
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: `${s.size}px`,
            color: 'var(--color-accent-primary)',
            opacity: s.opacity,
            animation: `sparkleFloat ${s.duration}s ease-in-out ${s.delay}s infinite`,
            userSelect: 'none',
          }}
        >
          {s.symbol}
        </span>
      ))}
    </div>
  );
}
