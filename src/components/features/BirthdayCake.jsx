import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBirthday } from '../../hooks/useBirthday';
import { X } from 'lucide-react';

const CANDLE_COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#5AADE2', '#C77DFF'];
const _birthdayImages = import.meta.glob('../../assets/intro/birthday-cake.{jpg,jpeg,png,webp}', {
  eager: true,
});
const birthdayImageSrc = Object.values(_birthdayImages)[0]?.default ?? null;

function CakeSVG() {
  return (
    <svg viewBox="0 0 64 64" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="54" rx="26" ry="5" fill="#E1F0FB" />
      <rect x="8" y="38" width="48" height="16" rx="4" fill="#7BC8F6" />
      <path d="M8 42 Q14 38 20 42 Q26 46 32 42 Q38 38 44 42 Q50 46 56 42" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="16" y="24" width="32" height="14" rx="4" fill="#5AADE2" />
      <path d="M16 28 Q20 24 24 28 Q28 32 32 28 Q36 24 40 28 Q44 32 48 28" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      {[22, 30, 38, 42].map((x, i) => (
        <g key={i}>
          <rect x={x - 1.5} y={16} width="3" height="8" rx="1.5" fill={CANDLE_COLORS[i]} />
          <motion.ellipse
            cx={x}
            cy={14}
            rx="2"
            ry="3"
            fill={CANDLE_COLORS[i]}
            animate={{ scaleY: [1, 1.3, 0.8, 1.2, 1], scaleX: [1, 0.8, 1.1, 0.9, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            style={{ transformOrigin: `${x}px 14px` }}
          />
        </g>
      ))}
      <text x="10" y="50" fontSize="6" fill="white" opacity="0.8">*</text>
      <text x="46" y="48" fontSize="5" fill="white" opacity="0.7">*</text>
    </svg>
  );
}

export default function BirthdayCake() {
  const isBirthday = useBirthday();
  const [open, setOpen] = useState(false);
  const [wobble, setWobble] = useState(false);

  if (!isBirthday) return null;

  return (
    <>
      <motion.button
        className="fixed right-20 bottom-6 z-40 rounded-full p-1 select-none"
        style={{
          background: 'linear-gradient(135deg, var(--color-accent-secondary), var(--color-accent-primary))',
          boxShadow: '0 4px 20px rgba(90,173,226,0.45)',
        }}
        animate={wobble ? { rotate: [0, -12, 12, -8, 8, 0] } : { y: [0, -5, 0] }}
        transition={wobble ? { duration: 0.5 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => {
          setOpen(true);
          setWobble(true);
          setTimeout(() => setWobble(false), 600);
        }}
        title="Birthday"
      >
        <CakeSVG />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
            style={{ background: 'rgba(10,20,40,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="rounded-3xl p-3 text-center max-w-md w-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #F0F8FF, #E1F0FB)',
                border: '2px solid var(--color-accent-secondary)',
                boxShadow: '0 20px 60px rgba(90,173,226,0.3)',
              }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-full"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <X size={16} />
              </button>

              {birthdayImageSrc ? (
                <img
                  src={birthdayImageSrc}
                  alt="Birthday"
                  className="w-full max-h-[70vh] object-contain rounded-2xl"
                />
              ) : (
                <div className="py-12 px-6 flex flex-col items-center gap-3">
                  <CakeSVG />
                  <p className="text-base font-bold" style={{ color: 'var(--color-accent-deep)' }}>
                    Add birthday-cake.jpg to src/assets/intro/
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
