// ============================================================
// src/components/features/BirthdaySplash.jsx
// Birthday splash overlay — shows only on June 10, once per session.
// Confetti + animated message + Enter button.
// ============================================================

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export default function BirthdaySplash({ onEnter }) {
  const hasConfettied = useRef(false);

  useEffect(() => {
    if (hasConfettied.current) return;
    hasConfettied.current = true;

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#5AADE2', '#7BC8F6', '#F4C430', '#0D9488', '#2E86C1'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.65 },
        colors: ['#5AADE2', '#F4C430', '#0D9488'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.65 },
        colors: ['#7BC8F6', '#F4C430', '#2E86C1'],
      });
    }, 400);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #E1F0FB 0%, #F0F8FF 50%, #D6EEFA 100%)',
      }}
    >
      <div className="text-center px-6 max-w-lg">
        {/* Spinning star icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <Sparkles size={56} style={{ color: 'var(--color-accent-primary)' }} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-3 rounded-full border-2 border-dashed"
              style={{ borderColor: 'var(--color-accent-secondary)' }}
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-4xl md:text-5xl font-extrabold mb-3"
          style={{ color: 'var(--color-accent-deep)' }}
        >
          Happy Birthday, Sham!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl mb-2"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          3 years. Unlimited lore. All of it — just for you.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm mb-10"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          from Sattvik, with the chaotic sincerity you deserve
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.75, type: 'spring', stiffness: 180 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnter}
          className="px-10 py-4 rounded-2xl text-white font-bold text-lg shadow-lg"
          style={{ background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-deep))' }}
        >
          Start watching 🎬
        </motion.button>
      </div>
    </motion.div>
  );
}
