// ============================================================
// src/components/episode/ClipReel.jsx
// Renders an array of clips — each clip has a src + title.
// Displayed as a vertical list of labelled embeds.
// ============================================================

import VideoPlayer from './VideoPlayer';

export default function ClipReel({ clips }) {
  if (!clips || clips.length === 0) {
    return (
      <div
        className="w-full py-10 rounded-xl text-center text-sm"
        style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)' }}
      >
        Clips coming soon 🎬
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {clips.map((clip, i) => {
        const src = typeof clip === 'string' ? clip : clip.src;
        const title = typeof clip === 'object' && clip.title ? clip.title : `Clip ${i + 1}`;
        const isPlaceholder = !src || src.includes('PASTE_');
        return (
          <div key={i} className="flex flex-col gap-2">
            {clips.length > 1 && (
              <p
                className="text-sm font-semibold"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {isPlaceholder ? `Clip ${i + 1}` : title}
              </p>
            )}
            {isPlaceholder ? (
              <div
                className="w-full aspect-video rounded-xl flex items-center justify-center text-sm"
                style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)' }}
              >
                Clip coming soon 🎬
              </div>
            ) : (
              <VideoPlayer src={src} title={title} />
            )}
          </div>
        );
      })}
    </div>
  );
}
