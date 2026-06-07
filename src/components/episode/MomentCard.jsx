// ============================================================
// src/components/episode/MomentCard.jsx
// Renders a text-only "moment" episode — description + insider note.
// No media. Pure vibes.
// ============================================================

import { MessageCircle, Lock } from 'lucide-react';

export default function MomentCard({ description, insiderNote }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Main description */}
      <div
        className="rounded-2xl p-6"
        style={{ background: 'var(--color-bg-secondary)' }}
      >
        <p
          className="text-base leading-relaxed"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {description || 'No description yet.'}
        </p>
      </div>

      {/* Insider note */}
      {insiderNote && (
        <div
          className="rounded-2xl px-5 py-4 flex items-start gap-3 border"
          style={{
            background: 'var(--color-accent-primary)' + '14',
            borderColor: 'var(--color-accent-secondary)',
          }}
        >
          <Lock
            size={15}
            className="mt-0.5 shrink-0"
            style={{ color: 'var(--color-accent-deep)' }}
          />
          <div>
            <p
              className="text-xs font-semibold mb-1 uppercase tracking-widest"
              style={{ color: 'var(--color-accent-deep)' }}
            >
              Insider note
            </p>
            <p
              className="text-sm italic leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              "{insiderNote}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
