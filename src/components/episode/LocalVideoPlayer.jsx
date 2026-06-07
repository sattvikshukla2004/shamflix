// src/components/episode/LocalVideoPlayer.jsx
// Plays local video files (s1e1v1.mp4 etc.) directly in the browser.
// Supports multiple videos per episode — shows them one after another.

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LocalVideoPlayer({ videos }) {
  const [idx, setIdx] = useState(0);
  if (!videos || videos.length === 0) return null;

  return (
    <div className="space-y-2">
      {/* Video element */}
      <div className="relative w-full rounded-xl overflow-hidden"
        style={{ background: '#000', aspectRatio: '16/9' }}>
        <AnimatePresence mode="wait">
          <motion.video
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={videos[idx]}
            controls
            className="w-full h-full object-contain"
            style={{ maxHeight: 400 }}
          />
        </AnimatePresence>
      </div>

      {/* Multi-video nav */}
      {videos.length > 1 && (
        <div className="flex items-center justify-between px-1">
          <button
            onClick={() => setIdx(i => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded disabled:opacity-30"
            style={{ color: 'var(--color-accent-primary)' }}>
            <ChevronLeft size={14} /> Prev clip
          </button>
          <span className="text-xs font-mono flex items-center gap-1.5"
            style={{ color: 'var(--color-text-tertiary)' }}>
            <Film size={12} /> {idx + 1} / {videos.length}
          </span>
          <button
            onClick={() => setIdx(i => Math.min(videos.length - 1, i + 1))}
            disabled={idx === videos.length - 1}
            className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded disabled:opacity-30"
            style={{ color: 'var(--color-accent-primary)' }}>
            Next clip <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
