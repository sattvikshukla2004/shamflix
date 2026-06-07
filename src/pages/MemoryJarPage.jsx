// src/pages/MemoryJarPage.jsx — SHIFT 4 COMPLETE
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memoryJarEntries } from '../data/data.js';

export default function MemoryJarPage() {
  const [shownIndices, setShownIndices] = useState([]);
  const [currentMemory, setCurrentMemory] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [allShown, setAllShown] = useState(false);
  const entriesRef = useRef([...memoryJarEntries]);

  const pullMemory = () => {
    if (isAnimating) return;

    const remaining = entriesRef.current.filter((_, i) => !shownIndices.includes(i));
    if (remaining.length === 0) {
      setAllShown(true);
      return;
    }

    setIsAnimating(true);
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const globalIndex = entriesRef.current.indexOf(remaining[randomIndex]);

    setCurrentMemory({ text: remaining[randomIndex], index: globalIndex });
    setShownIndices(prev => [...prev, globalIndex]);

    setTimeout(() => setIsAnimating(false), 600);

    if (shownIndices.length + 1 >= entriesRef.current.length) {
      setAllShown(true);
    }
  };

  const reset = () => {
    setShownIndices([]);
    setCurrentMemory(null);
    setAllShown(false);
  };

  const remaining = memoryJarEntries.length - shownIndices.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-bg-primary pb-24"
    >
      {/* Header */}
      <div className="bg-bg-secondary border-b border-[#C8E3F5] py-12 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-semibold tracking-[0.25em] uppercase text-[#5AADE2] mb-2"
        >
          SHAMFLIX EXTRAS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-[#1A2E3B] mb-3"
        >
          Memory Jar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-[#4A6B82] text-lg max-w-md mx-auto"
        >
          Pull a memory. Each one only appears once. Some things are worth remembering slowly.
        </motion.p>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-12 flex flex-col items-center">

        {/* Jar SVG */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
          className="mb-8"
        >
          <svg width="160" height="200" viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Lid */}
            <rect x="30" y="8" width="100" height="22" rx="6" fill="#C8E3F5" stroke="#7BC8F6" strokeWidth="2"/>
            <rect x="50" y="4" width="60" height="12" rx="4" fill="#A8D4EF" stroke="#7BC8F6" strokeWidth="1.5"/>
            {/* Jar body */}
            <path d="M28 30 Q20 50 18 100 Q16 160 24 178 Q32 195 80 195 Q128 195 136 178 Q144 160 142 100 Q140 50 132 30 Z"
              fill="rgba(225,240,251,0.7)" stroke="#7BC8F6" strokeWidth="2.5"/>
            {/* Glass shine */}
            <path d="M38 50 Q34 90 34 130" stroke="rgba(255,255,255,0.6)" strokeWidth="5" strokeLinecap="round"/>
            {/* Paper slips inside */}
            {shownIndices.length < memoryJarEntries.length && (
              <>
                <rect x="50" y="130" width="60" height="14" rx="3" fill="#F4C430" opacity="0.7" transform="rotate(-5 80 137)"/>
                <rect x="52" y="148" width="55" height="12" rx="3" fill="#5AADE2" opacity="0.5" transform="rotate(3 80 154)"/>
                <rect x="48" y="163" width="65" height="12" rx="3" fill="#7BC8F6" opacity="0.6" transform="rotate(-2 80 169)"/>
              </>
            )}
            {remaining === 0 && (
              <text x="80" y="165" textAnchor="middle" fill="#8AAEC4" fontSize="11" fontFamily="system-ui">empty</text>
            )}
            {/* Jar outline overlay for depth */}
            <path d="M28 30 Q20 50 18 100 Q16 160 24 178 Q32 195 80 195 Q128 195 136 178 Q144 160 142 100 Q140 50 132 30 Z"
              fill="none" stroke="#C8E3F5" strokeWidth="1"/>
          </svg>
        </motion.div>

        {/* Counter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[#8AAEC4] text-sm mb-6"
        >
          {remaining > 0 ? `${remaining} memor${remaining === 1 ? 'y' : 'ies'} remaining` : 'All memories have been pulled'}
        </motion.p>

        {/* Pull button */}
        {!allShown && (
          <motion.button
            onClick={pullMemory}
            disabled={isAnimating}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-2xl font-bold text-white shadow-md transition-all duration-200 mb-8 text-base"
            style={{ backgroundColor: '#5AADE2', opacity: isAnimating ? 0.7 : 1 }}
          >
            ✨ Pull a memory
          </motion.button>
        )}

        {allShown && (
          <motion.button
            onClick={reset}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-2xl font-bold text-[#5AADE2] border-2 border-[#5AADE2] bg-white shadow-sm mb-8"
          >
            🔄 Refill the jar
          </motion.button>
        )}

        {/* Current memory slip */}
        <AnimatePresence mode="wait">
          {currentMemory && (
            <motion.div
              key={currentMemory.index}
              initial={{ opacity: 0, y: -40, rotate: -4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotate: 1, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              className="w-full max-w-sm"
            >
              <div
                className="rounded-2xl p-7 shadow-lg border border-[#C8E3F5] relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #fffdf4 0%, #f8f4e8 100%)' }}
              >
                {/* Paper texture top strip */}
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl" style={{ backgroundColor: '#F4C430' }} />
                {/* Fold corner */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#e8e0cc]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />

                <p className="text-[#1A2E3B] text-base leading-relaxed font-medium pr-4" style={{ fontFamily: 'Georgia, serif' }}>
                  "{currentMemory.text}"
                </p>
                <p className="text-[#8AAEC4] text-xs mt-4">— from the jar</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Previously pulled memories (small) */}
        {shownIndices.length > 1 && (
          <div className="mt-10 w-full">
            <p className="text-[#8AAEC4] text-xs uppercase tracking-widest text-center mb-4">Previously pulled</p>
            <div className="flex flex-col gap-2">
              {shownIndices.slice(0, -1).reverse().map(idx => (
                <div
                  key={idx}
                  className="rounded-xl px-4 py-3 text-sm text-[#4A6B82] bg-white border border-[#E1F0FB]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  "{memoryJarEntries[idx]}"
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
