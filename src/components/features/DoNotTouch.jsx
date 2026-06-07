// src/components/features/DoNotTouch.jsx
// Cycles through dnt1.jpg, dnt2.jpg, dnt3.jpg... on each touch.
// Add more images named dnt4.jpg, dnt5.jpg etc — auto-detected.

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const _dntImgs = import.meta.glob('../../assets/donottouch/dnt*.{jpg,jpeg,png,webp}', { eager: true });
const _dntVideos = import.meta.glob('../../assets/donottouch/dnt*.{mp4,webm,mov}', { eager: true, query: '?url', import: 'default' });

const DNT_MEDIA = [...Object.entries(_dntImgs), ...Object.entries(_dntVideos)]
  .sort(([a], [b]) => {
    const na = parseInt(a.match(/dnt(\d+)/)?.[1] ?? 0);
    const nb = parseInt(b.match(/dnt(\d+)/)?.[1] ?? 0);
    if (na !== nb) return na - nb;
    return a.localeCompare(b);
  })
  .map(([path, mod]) => ({
    type: /\.(mp4|webm|mov)$/i.test(path) ? 'video' : 'image',
    src: mod.default,
  }));

const MESSAGES = [
  "I told you not to touch it.",
  "You touched it again. Remarkable.",
  "You have a problem.",
  "This is the third time. I'm concerned.",
  "Ok at this point you're just vibing. Fair.",
];

export default function DoNotTouch() {
  const [touchCount, setTouchCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleTouch = () => {
    setTouchCount(c => c + 1);
    setOpen(true);
  };

  const imgIdx = touchCount === 0 ? 0 : (touchCount - 1) % Math.max(DNT_MEDIA.length, 1);
  const msg = MESSAGES[Math.min(touchCount - 1, MESSAGES.length - 1)];
  const currentMedia = DNT_MEDIA[imgIdx];

  return (
    <>
      <div className="fixed bottom-6 left-4 z-30">
        <motion.button
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onClick={handleTouch}
          animate={{ opacity: hovered ? 0.9 : 0.12 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-0.5 select-none"
          title=""
        >
          <div className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase"
            style={{ background: '#E74C3C', color: '#fff', transform: 'rotate(-2deg)', boxShadow: '0 1px 4px rgba(231,76,60,0.3)' }}>
            ⚠ DO NOT
          </div>
          <div className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase"
            style={{ background: '#E74C3C', color: '#fff', transform: 'rotate(1deg)', boxShadow: '0 1px 4px rgba(231,76,60,0.3)' }}>
            TOUCH
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(10,20,30,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
            <motion.div initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative rounded-2xl overflow-hidden max-w-md w-full"
              style={{ background: 'var(--color-bg-card)', border: '2px solid #E74C3C' }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ background: '#E74C3C' }}>
                <p className="text-sm font-bold text-white">⚠️ I SAID DON'T TOUCH IT</p>
                <button onClick={() => setOpen(false)}><X size={16} color="white" /></button>
              </div>
              <div className="p-4 space-y-3">
              <div className="py-8 px-4 text-center space-y-3">
                <p className="text-2xl">🥃</p>
                <p className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
                  i told you do not touch
                </p>
                <p className="text-sm font-semibold" style={{ color: '#E74C3C' }}>
                  now u owe me smirnoff
                </p>
              </div>
                <p className="text-sm text-center font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  {msg}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
