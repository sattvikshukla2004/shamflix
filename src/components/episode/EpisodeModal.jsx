// src/components/episode/EpisodeModal.jsx
// Simplified: no type system. Auto-shows whatever the episode has.
// Has video? Shows it. Has photos? Shows gallery. Has both? Shows both.
// p0 = thumbnail only. p1,p2,p3... = gallery photos.

import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from './VideoPlayer';
import LocalVideoPlayer from './LocalVideoPlayer';
import GalleryViewer from './GalleryViewer';

// ── Insider note ───────────────────────────────────────────
function InsiderNote({ note }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-4 py-3 text-left"
        style={{ background: 'var(--color-bg-secondary)' }}
      >
        <Lock size={13} style={{ color: 'var(--color-accent-primary)', flexShrink: 0 }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
          Insider Note
        </span>
        <span className="ml-auto text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          {open ? '▲' : '▼'}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-4 py-3 text-sm italic" style={{ color: 'var(--color-text-secondary)' }}>
              "{note}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main modal ─────────────────────────────────────────────
export default function EpisodeModal({ episodes, startIndex, onClose, unlocked = false }) {
  const [idx, setIdx] = useState(startIndex ?? 0);
  const backdropRef = useRef(null);

  const episode = episodes[idx];
  // For locked+unlocked episodes, use secret content
  const isLockedEp = episode.locked;
  const displayTitle = (isLockedEp && unlocked && episode.secretTitle) ? episode.secretTitle : episode.title;
  const displayDescription = (isLockedEp && unlocked && episode.secretDescription) ? episode.secretDescription : episode.description;
  const displayInsiderNote = (isLockedEp && unlocked && episode.secretInsiderNote) ? episode.secretInsiderNote : episode.insiderNote;
  const hasVideo = episode.video && !episode.video.includes('PASTE');
  const hasPhotos = Array.isArray(episode.photos) && episode.photos.length > 0;

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && idx > 0) setIdx(i => i - 1);
      if (e.key === 'ArrowRight' && idx < episodes.length - 1) setIdx(i => i + 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [idx, episodes.length, onClose]);

  // Reset scroll on episode change
  const scrollRef = useRef(null);
  useEffect(() => { scrollRef.current?.scrollTo(0, 0); }, [idx]);

  return (
    <AnimatePresence>
      <motion.div
        ref={backdropRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(10, 20, 36, 0.7)', backdropFilter: 'blur(6px)' }}
        onClick={(e) => e.target === backdropRef.current && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, y: 16, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl overflow-hidden"
          style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', boxShadow: '0 24px 80px rgba(0,0,0,0.35)' }}
        >
          {/* ── Floating close button — always visible top right ── */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full shadow-lg transition-opacity hover:opacity-80"
            style={{ background: 'var(--color-accent-deep)', color: '#fff' }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
          {/* ── Header ── */}
          <div className="flex items-start justify-between px-6 pt-5 pb-3 flex-shrink-0">
            <div className="pr-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-accent-primary)' }}>
                {episode.seasonTitle ?? ''}{episode.seasonTitle && episode.number ? ' · ' : ''}
                {episode.number ? `EP ${episode.number}` : ''}
              </p>
              <h2 className="text-xl font-extrabold leading-tight" style={{ color: 'var(--color-accent-deep)' }}>
                {displayTitle}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                {episode.date && (
                  <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{episode.date}</span>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pb-4 space-y-4 min-h-0">

            {/* YouTube video — if episode.video is set */}
            {hasVideo && <VideoPlayer src={episode.video} title={displayTitle} />}

            {/* Local videos — s1e1v1.mp4, s1e1v2.mp4 etc. auto-detected */}
            {episode.localVideos?.length > 0 && (
              <LocalVideoPlayer videos={episode.localVideos} />
            )}

            {/* Description */}
            {episode.description && (
              <p className="text-sm leading-relaxed rounded-xl px-4 py-3"
                style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)' }}>
                {displayDescription}
              </p>
            )}

            {/* Photos — p1, p2, p3... auto-detected */}
            {hasPhotos && <GalleryViewer photos={episode.photos} />}

            {/* Insider note */}
            {displayInsiderNote && <InsiderNote note={displayInsiderNote} />}

          </div>

          {/* ── Footer nav ── */}
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
            style={{ borderTop: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setIdx(i => i - 1)}
              disabled={idx === 0}
              className="flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-lg transition-opacity disabled:opacity-30"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="text-xs font-mono" style={{ color: 'var(--color-text-tertiary)' }}>
              {idx + 1} / {episodes.length}
            </span>
            <button
              onClick={() => setIdx(i => i + 1)}
              disabled={idx === episodes.length - 1}
              className="flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-lg transition-opacity disabled:opacity-30"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
