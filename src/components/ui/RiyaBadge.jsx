// ============================================================
// src/components/ui/RiyaBadge.jsx
// Teal badge that appears when riyaInvolved: true on an episode.
// ============================================================

import { Users } from 'lucide-react';

export default function RiyaBadge({ className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full
        text-xs font-semibold text-white tracking-wide
        ${className}
      `}
      style={{ backgroundColor: 'var(--color-riya-badge)' }}
      title="Riya was there"
    >
      <Users size={10} strokeWidth={2.5} />
      Riya was there
    </span>
  );
}
