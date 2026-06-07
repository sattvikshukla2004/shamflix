// ============================================================
// src/components/ui/ContentWarning.jsx
// Subtle content warning line shown on episode cards/modals.
// ============================================================

import { AlertCircle } from 'lucide-react';

export default function ContentWarning({ text, className = '' }) {
  if (!text) return null;
  return (
    <p
      className={`flex items-start gap-1.5 text-xs italic ${className}`}
      style={{ color: 'var(--color-text-tertiary)' }}
    >
      <AlertCircle size={12} className="mt-0.5 shrink-0 opacity-60" />
      <span>{text}</span>
    </p>
  );
}
