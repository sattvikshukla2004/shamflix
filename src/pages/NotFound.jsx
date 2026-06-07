// src/pages/NotFound.jsx — SHIFT 5 COMPLETE
// Leon Kennedy / RE4 themed 404 page
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RADIO_LINES = [
  '> INCOMING TRANSMISSION...',
  '> KENNEDY, S. — FIELD REPORT',
  "> Location: Unknown. Route: unclear.",
  '> Status: 404 — Memory not found.',
  '> Hm. Where\'s everyone going?',
  '> Bingo was his name-o.',
  '> Searching for the correct path...',
  '> Recommend returning to base.',
];

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#0e1a0e] flex flex-col items-center justify-center px-4 py-20"
    >
      {/* Biohazard icon */}
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
        className="mb-8 opacity-30"
      >
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="36" cy="36" r="34" stroke="#4a7c4a" strokeWidth="2"/>
          <circle cx="36" cy="36" r="8" stroke="#4a7c4a" strokeWidth="2"/>
          <path d="M36 28 Q36 10 20 14 Q10 18 14 30" stroke="#4a7c4a" strokeWidth="2" fill="none"/>
          <path d="M36 28 Q50 16 56 28 Q60 38 48 42" stroke="#4a7c4a" strokeWidth="2" fill="none"/>
          <path d="M36 44 Q22 52 24 42 Q24 34 36 36" stroke="#4a7c4a" strokeWidth="2" fill="none"/>
        </svg>
      </motion.div>

      {/* Error code */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xs font-mono tracking-[0.4em] uppercase text-[#4a7c4a] mb-2"
      >
        ERROR 404 — RACCOON CITY DATABASE
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-black text-[#8fbc8f] mb-4 tracking-tight text-center"
      >
        Memory not found.
      </motion.h1>

      {/* RE4 quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mb-8 text-center"
      >
        <p className="text-[#4a7c4a] italic text-lg font-mono">
          "Hm. Where's everyone going?"
        </p>
        <p className="text-[#2a4a2a] text-xs mt-1 font-mono">— Leon S. Kennedy, RE4</p>
      </motion.div>

      {/* Radio terminal */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="w-full max-w-sm bg-[#060e06] border border-[#1e3a1e] rounded-xl p-5 mb-8 font-mono text-xs"
      >
        {RADIO_LINES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.12 }}
            className="mb-1"
            style={{ color: i === 4 ? '#8fbc8f' : '#2a5a2a' }}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>

      {/* Go home button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[#0e1a0e] bg-[#8fbc8f] hover:bg-[#a8d4a8] transition-colors shadow-lg"
        >
          ← Return to safety
        </Link>
      </motion.div>

      {/* Bingo */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="text-[#1e3a1e] text-xs font-mono mt-10"
      >
        bingo was his name-o
      </motion.p>
    </motion.div>
  );
}
