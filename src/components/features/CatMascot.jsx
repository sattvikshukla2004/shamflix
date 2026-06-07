// ============================================================
// src/components/features/CatMascot.jsx
// Fixed bottom-right cat mascot. Blinks, tail wags on hover,
// shows a random cat fact speech bubble on click.
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CAT_FACTS = [
  "Cats spend 70% of their lives sleeping. Relatable.",
  "A group of cats is called a clowder. Sham is the clowder leader.",
  "Cats have 32 muscles in each ear. That's 32 reasons to listen.",
  "Cats can't taste sweetness. They have better things to do.",
  "A cat's purr vibrates at 25–150 Hz, which can heal bones. You're welcome.",
  "Cats blink slowly to say 'I love you'. Try it back.",
  "The oldest cat ever lived to 38. Absolute legend.",
  "Cats have a third eyelid called a nictitating membrane. Very mysterious.",
  "Cats can jump 6x their body length. Cardio who?",
  "A cat's nose print is as unique as a human fingerprint.",
  "Cats meow almost exclusively to communicate with humans, not other cats.",
  "Ancient Egyptians shaved their eyebrows to mourn a cat's death. Iconic.",
  "Cats always land on their feet due to their 'righting reflex'.",
  "A cat's heart beats nearly twice as fast as a human's.",
  "Cats have lived alongside humans for at least 9,500 years. Besties forever.",
];

// Simple ASCII-art-style SVG cat
function CatSVG({ isWagging, isBlinking }) {
  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Tail */}
      <motion.path
        d="M 20 60 Q 8 55 10 42 Q 12 30 18 35"
        stroke="#5AADE2"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        animate={isWagging ? { rotate: [0, 18, -18, 14, -10, 0] } : { rotate: 0 }}
        style={{ transformOrigin: '18px 35px' }}
        transition={{ duration: 0.5, repeat: isWagging ? Infinity : 0, ease: 'easeInOut' }}
      />

      {/* Body */}
      <ellipse cx="42" cy="55" rx="22" ry="17" fill="#7BC8F6" />

      {/* Head */}
      <circle cx="42" cy="30" r="18" fill="#7BC8F6" />

      {/* Left ear */}
      <polygon points="26,17 22,4 34,14" fill="#7BC8F6" />
      <polygon points="28,16 25,8 33,15" fill="#5AADE2" />

      {/* Right ear */}
      <polygon points="58,17 62,4 50,14" fill="#7BC8F6" />
      <polygon points="56,16 59,8 51,15" fill="#5AADE2" />

      {/* Eyes */}
      {isBlinking ? (
        <>
          {/* Blink — closed eyes */}
          <line x1="34" y1="29" x2="39" y2="29" stroke="#2E86C1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="29" x2="50" y2="29" stroke="#2E86C1" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Open eyes */}
          <ellipse cx="36" cy="29" rx="4" ry="4.5" fill="#2E86C1" />
          <ellipse cx="48" cy="29" rx="4" ry="4.5" fill="#2E86C1" />
          {/* Pupils */}
          <ellipse cx="36" cy="30" rx="2" ry="3" fill="#1A2E3B" />
          <ellipse cx="48" cy="30" rx="2" ry="3" fill="#1A2E3B" />
          {/* Eye shine */}
          <circle cx="37.5" cy="28" r="1" fill="white" />
          <circle cx="49.5" cy="28" r="1" fill="white" />
        </>
      )}

      {/* Nose */}
      <ellipse cx="42" cy="36" rx="2" ry="1.5" fill="#2E86C1" />

      {/* Mouth */}
      <path d="M 42 37.5 Q 38 40 36 39" stroke="#2E86C1" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 42 37.5 Q 46 40 48 39" stroke="#2E86C1" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Whiskers */}
      <line x1="22" y1="35" x2="34" y2="36" stroke="#2E86C1" strokeWidth="1" strokeLinecap="round" />
      <line x1="22" y1="38" x2="34" y2="38" stroke="#2E86C1" strokeWidth="1" strokeLinecap="round" />
      <line x1="50" y1="36" x2="62" y2="35" stroke="#2E86C1" strokeWidth="1" strokeLinecap="round" />
      <line x1="50" y1="38" x2="62" y2="38" stroke="#2E86C1" strokeWidth="1" strokeLinecap="round" />

      {/* Tummy stripe */}
      <ellipse cx="42" cy="57" rx="10" ry="8" fill="#C8E3F5" opacity="0.6" />
    </svg>
  );
}

export default function CatMascot() {
  const [isHovering, setIsHovering] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [fact, setFact] = useState(null);
  const [factIndex, setFactIndex] = useState(0);
  const blinkTimer = useRef(null);

  // Blink loop — random interval between 3–7s
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 3000 + Math.random() * 4000;
      blinkTimer.current = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 150);
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(blinkTimer.current);
  }, []);

  const handleClick = () => {
    const nextIndex = (factIndex + 1) % CAT_FACTS.length;
    setFactIndex(nextIndex);
    setFact(CAT_FACTS[nextIndex]);
    // Auto-dismiss after 5s
    setTimeout(() => setFact(null), 5000);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 select-none"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {fact && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ duration: 0.22 }}
            className="relative max-w-[220px] rounded-2xl rounded-br-none p-3 shadow-lg"
            style={{
              background: 'white',
              border: '1.5px solid var(--color-border)',
              boxShadow: '0 4px 20px rgba(90,173,226,0.18)',
            }}
          >
            <button
              onClick={() => setFact(null)}
              className="absolute top-1.5 right-1.5 opacity-40 hover:opacity-70 transition-opacity"
              aria-label="Close"
            >
              <X size={12} />
            </button>
            <p className="text-xs leading-relaxed pr-4" style={{ color: 'var(--color-text-primary)' }}>
              🐾 {fact}
            </p>
            {/* Bubble tail */}
            <div
              className="absolute -bottom-2 right-5 w-4 h-2 overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="w-3 h-3 rotate-45 translate-y-[-6px]"
                style={{ background: 'white', border: '1.5px solid var(--color-border)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cat button */}
      <motion.button
        onClick={handleClick}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        className="w-16 h-16 cursor-pointer focus-visible:outline-none"
        aria-label="Cat mascot — click for a cat fact!"
        title="Click me for a cat fact! 🐱"
        animate={isHovering ? { y: [0, -4, 0] } : { y: 0 }}
        transition={{ duration: 0.4, repeat: isHovering ? Infinity : 0, ease: 'easeInOut' }}
        whileTap={{ scale: 0.92 }}
      >
        <CatSVG isWagging={isHovering} isBlinking={isBlinking} />
      </motion.button>
    </div>
  );
}
