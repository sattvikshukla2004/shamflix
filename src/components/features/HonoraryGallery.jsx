// src/components/features/HonoraryGallery.jsx
// Full-screen gallery lightbox for honorary mention collections.
// Photos: bundled local files (instant load). Videos: YouTube embeds.
// Nav: back button, arrow keys, on-screen arrows, touch swipe, dot indicators.

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, PlayCircle, Image as ImageIcon, MessageCircle, ChevronDown } from 'lucide-react';

const SWIPE_THRESHOLD = 60;

// ── Video slide ────────────────────────────────────────────
function VideoSlide({ src }) {
  const embedSrc = src
    .replace('watch?v=', 'embed/')
    .replace('youtu.be/', 'www.youtube.com/embed/');
  return (
    <div className="w-full h-full flex items-center justify-center p-3 md:p-8">
      <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
        <iframe
          src={embedSrc}
          className="w-full h-full"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title="gallery video"
        />
      </div>
    </div>
  );
}

// ── Photo slide — bundled = instant, no spinner needed ─────
function PhotoSlide({ src }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-3 md:p-8">
      <img
        src={src}
        alt=""
        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl select-none"
        draggable={false}
      />
    </div>
  );
}

// ── Empty state ────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8 text-center">
      <ImageIcon size={52} style={{ color: 'var(--color-accent-primary)', opacity: 0.25 }} />
      <p className="font-bold text-lg" style={{ color: 'var(--color-text-secondary)' }}>
        Coming soon
      </p>
      <p className="text-sm max-w-xs" style={{ color: 'var(--color-text-tertiary)' }}>
        Sattvik is still curating this collection. Check back later.
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────
export default function HonoraryGallery({ collection, onClose }) {
  const items = collection.items ?? [];
  const hasItems = items.length > 0;

  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback((next) => {
    if (!hasItems || items.length <= 1) return;
    const clamped = ((next % items.length) + items.length) % items.length;
    setDirection(next > idx ? 1 : -1);
    setIdx(clamped);
    setShowNote(false);
  }, [idx, items.length, hasItems]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') goTo(idx - 1);
      else if (e.key === 'ArrowRight') goTo(idx + 1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [idx, goTo, onClose]);

  // Touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) diff > 0 ? goTo(idx + 1) : goTo(idx - 1);
    touchStartX.current = null;
  };

  const current = hasItems ? items[idx] : null;

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? '55%' : '-55%', opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (d) => ({ x: d > 0 ? '-55%' : '55%', opacity: 0, scale: 0.96, transition: { duration: 0.22 } }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[180] flex flex-col"
      style={{ background: 'rgba(6, 14, 24, 0.97)' }}
    >
      {/* ── Top bar ── */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Back button — prominent, always visible */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
          style={{ color: 'var(--color-accent-secondary)' }}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-white text-sm truncate">{collection.title}</h2>
          {hasItems && (
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {idx + 1} of {items.length} • {current?.type === 'video' ? 'Video' : 'Photo'}
            </p>
          )}
        </div>

        {/* Type pill */}
        {current && (
          <span
            className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(90,173,226,0.18)', color: 'var(--color-accent-secondary)' }}
          >
            {current.type === 'video'
              ? <><PlayCircle size={11} /> Video</>
              : <><ImageIcon size={11} /> Photo</>
            }
          </span>
        )}
      </div>

      {/* ── Slide area ── */}
      <div
        className="flex-1 relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {!hasItems ? (
          <EmptyState />
        ) : (
          <>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={idx}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                {current.type === 'video'
                  ? <VideoSlide src={current.src} />
                  : <PhotoSlide src={current.src} />
                }
              </motion.div>
            </AnimatePresence>

            {/* Desktop prev/next arrows */}
            {items.length > 1 && (
              <>
                <button
                  onClick={() => goTo(idx - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center transition-all hover:scale-110 z-10 hidden md:flex"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={() => goTo(idx + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center transition-all hover:scale-110 z-10 hidden md:flex"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* ── Caption + insider note ── */}
      {current && (current.caption || current.note) && (
        <div
          className="flex-shrink-0 px-5 py-3 space-y-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.4)' }}
        >
          {current.caption && (
            <p className="text-sm text-white font-medium leading-snug">{current.caption}</p>
          )}
          {current.note && (
            showNote ? (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs italic flex items-center gap-1.5"
                style={{ color: 'var(--color-accent-secondary)' }}
              >
                <MessageCircle size={11} /> {current.note}
              </motion.p>
            ) : (
              <button
                onClick={() => setShowNote(true)}
                className="flex items-center gap-1 text-xs"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                <ChevronDown size={12} /> Show insider note
              </button>
            )
          )}
        </div>
      )}

      {/* ── Bottom nav: mobile arrows + dots ── */}
      {hasItems && items.length > 1 && (
        <div className="flex-shrink-0 flex items-center justify-center gap-4 py-3">
          {/* Mobile prev/next */}
          <button
            onClick={() => goTo(idx - 1)}
            className="w-9 h-9 rounded-full flex items-center justify-center md:hidden"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots — max 15 shown */}
          <div className="flex items-center gap-1.5">
            {items.slice(0, 15).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === idx ? 18 : 7,
                  height: 7,
                  background: i === idx ? 'var(--color-accent-primary)' : 'rgba(255,255,255,0.22)',
                }}
              />
            ))}
            {items.length > 15 && (
              <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                +{items.length - 15}
              </span>
            )}
          </div>

          <button
            onClick={() => goTo(idx + 1)}
            className="w-9 h-9 rounded-full flex items-center justify-center md:hidden"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Mobile swipe hint */}
      {hasItems && items.length > 1 && (
        <p className="text-center text-xs pb-2 md:hidden" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Swipe left / right to browse
        </p>
      )}
    </motion.div>
  );
}
