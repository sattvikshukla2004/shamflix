// src/components/episode/GalleryViewer.jsx
// Photo grid + full lightbox. Arrow keys navigate PHOTOS (not episodes).
// Stops arrow key propagation so parent modal doesn't react.

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Lightbox({ photos, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const [dir, setDir] = useState(0);

  const go = useCallback((next) => {
    const clamped = ((next % photos.length) + photos.length) % photos.length;
    setDir(next > idx ? 1 : -1);
    setIdx(clamped);
  }, [idx, photos.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  { e.stopPropagation(); go(idx - 1); }
      else if (e.key === 'ArrowRight') { e.stopPropagation(); go(idx + 1); }
      else if (e.key === 'Escape') onClose();
    };
    // useCapture=true so this fires BEFORE the parent modal handler
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [idx, go, onClose]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? '40%' : '-40%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.22 } },
    exit:  (d) => ({ x: d > 0 ? '-40%' : '40%', opacity: 0, transition: { duration: 0.18 } }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex flex-col"
      style={{ background: 'rgba(4,10,18,0.97)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {idx + 1} / {photos.length}
        </span>
        <button onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.img key={idx} custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit"
            src={photos[idx]} alt={`Photo ${idx + 1}`}
            className="max-w-full max-h-full object-contain rounded-xl select-none"
            draggable={false} style={{ maxHeight: 'calc(100vh - 140px)' }}
          />
        </AnimatePresence>
        {photos.length > 1 && <>
          <button onClick={() => go(idx - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center hidden md:flex"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'white' }}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => go(idx + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center hidden md:flex"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'white' }}>
            <ChevronRight size={20} />
          </button>
        </>}
      </div>

      {photos.length > 1 && (
        <div className="flex-shrink-0 flex items-center justify-center gap-3 py-3">
          <button onClick={() => go(idx - 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center md:hidden"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5">
            {photos.slice(0, 12).map((_, i) => (
              <button key={i} onClick={() => go(i)} className="rounded-full transition-all"
                style={{ width: i === idx ? 16 : 6, height: 6,
                  background: i === idx ? 'var(--color-accent-primary)' : 'rgba(255,255,255,0.25)' }} />
            ))}
            {photos.length > 12 && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>+{photos.length-12}</span>}
          </div>
          <button onClick={() => go(idx + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center md:hidden"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default function GalleryViewer({ photos }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const hasPhotos = Array.isArray(photos) && photos.length > 0;

  if (!hasPhotos) {
    return (
      <div className="w-full py-14 rounded-xl text-center flex flex-col items-center gap-3"
        style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)' }}>
        <Images size={32} className="opacity-40" />
        <p className="text-sm">Photos coming soon 📸</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 rounded-xl overflow-hidden">
        {photos.map((src, i) => (
          <button key={i} onClick={() => setLightboxIdx(i)}
            className="aspect-square overflow-hidden rounded-lg relative group focus:outline-none">
            <img src={src} alt={`Photo ${i+1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-lg" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox photos={photos} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
