// ============================================================
// src/components/features/LeonEasterEgg.jsx
// Hidden biohazard button on the home page (bottom-left area).
// Clicking it opens a dark RE4-radio-message modal.
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const LEON_MESSAGES = [
  "This is Special Agent Leon S. Kennedy. I've found the target. She likes cats and chaos. Over.",
  "Leon here. Intel confirmed: the subject has a 100% mango hit rate. Proceed with caution.",
  "Bingo was his name-o. The memories are real. The archives are real. You are not dreaming.",
  "Kennedy to HQ: friendship classified at highest level. Cannot be redacted. Will not be redacted.",
  "It's Leon. I've fought Ganados, Salazars, and entire armies. None of them were as chaotic as Riya.",
  "Target located. Status: thriving. Mission complete. Going back to bed.",
];

function BiohazardIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Center circle */}
      <circle cx="50" cy="50" r="8" />
      {/* Three arcs */}
      <path d="M50 42 A18 18 0 0 1 65.6 51 L72 47 A26 26 0 0 0 50 34 Z" />
      <path d="M65.6 51 A18 18 0 0 1 50 69 L50 77 A26 26 0 0 0 75.6 55 Z" />
      <path d="M50 69 A18 18 0 0 1 34.4 51 L28 55 A26 26 0 0 0 50 77 Z" />
      {/* Outer ring */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
      {/* Bottom stem */}
      <rect x="47" y="74" width="6" height="12" rx="3" />
      <rect x="38" y="83" width="24" height="5" rx="2.5" />
    </svg>
  );
}

export default function LeonEasterEgg() {
  const [open, setOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentMessage = LEON_MESSAGES[messageIndex];

  // Typewriter effect when modal opens
  useEffect(() => {
    if (!open) {
      setTyped('');
      return;
    }
    setIsTyping(true);
    setTyped('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < currentMessage.length) {
        setTyped(currentMessage.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [open, currentMessage]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleNext = () => {
    setMessageIndex((prev) => (prev + 1) % LEON_MESSAGES.length);
  };

  return (
    <>
      {/* Hidden trigger button — bottom-left of the page section it's placed in */}
      <motion.button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 focus-visible:outline-none"
        aria-label="Leon Easter Egg"
        title="..."
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        whileHover={{ opacity: 0.65, scale: 1.1 }}
        transition={{ duration: 0.3 }}
        style={{ color: 'var(--color-text-tertiary)', cursor: 'default' }}
        whileTap={{ scale: 0.95 }}
      >
        <BiohazardIcon size={20} />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="pointer-events-auto w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: '#0c1220',
                  border: '1.5px solid #1e3a5f',
                  boxShadow: '0 0 60px rgba(0,100,200,0.25), 0 0 120px rgba(0,50,120,0.15)',
                }}
              >
                {/* Header bar */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ background: '#0a0f1e', borderBottom: '1px solid #1e3a5f' }}
                >
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#E74C3C' }}>
                      <BiohazardIcon size={16} />
                    </span>
                    <span
                      className="text-xs font-mono font-bold tracking-widest uppercase"
                      style={{ color: '#7ecfff' }}
                    >
                      RE4 RADIO TRANSMISSION
                    </span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-600 hover:text-gray-400 transition-colors"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Signal header */}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 rounded-full"
                          style={{ background: '#2E86C1' }}
                          animate={{ height: ['8px', `${12 + i * 4}px`, '8px'] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className="text-xs font-mono"
                      style={{ color: '#4A6B82' }}
                    >
                      AGENT: LSK-001 · CHANNEL: CLASSIFIED
                    </span>
                  </div>

                  {/* Message */}
                  <div
                    className="rounded-xl p-4 mb-5 min-h-[80px]"
                    style={{
                      background: '#070d1a',
                      border: '1px solid #1a3a5c',
                    }}
                  >
                    <p
                      className="text-sm font-mono leading-relaxed"
                      style={{ color: '#7ecfff' }}
                    >
                      "{typed}
                      {isTyping && (
                        <span className="animate-cursor-blink inline-block w-[2px] h-[1em] bg-current align-middle ml-0.5" />
                      )}
                      "
                    </p>
                  </div>

                  {/* Footer actions */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-mono"
                      style={{ color: '#2E86C1' }}
                    >
                      MSG {messageIndex + 1}/{LEON_MESSAGES.length}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleNext}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all hover:opacity-80"
                        style={{
                          background: '#1a3a5c',
                          color: '#7ecfff',
                          border: '1px solid #2E86C1',
                        }}
                      >
                        NEXT MSG
                      </button>
                      <button
                        onClick={() => setOpen(false)}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all hover:opacity-80"
                        style={{
                          background: '#1a1a2e',
                          color: '#4A6B82',
                          border: '1px solid #1a3a5c',
                        }}
                      >
                        CLOSE CHANNEL
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="px-4 py-2 text-center"
                  style={{ background: '#070d1a', borderTop: '1px solid #1e3a5f' }}
                >
                  <span
                    className="text-[10px] font-mono tracking-widest"
                    style={{ color: '#2E86C1', opacity: 0.5 }}
                  >
                    SHAMFLIX CLASSIFIED ARCHIVES · BINGO WAS HIS NAME-O
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
