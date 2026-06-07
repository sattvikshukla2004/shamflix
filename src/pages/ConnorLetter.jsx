// src/pages/ConnorLetter.jsx — SHIFT 5 COMPLETE
// Detroit: Become Human aesthetic — dark UI only on this page
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { connorLetter } from '../data/data.js';

// Typewriter hook
function useTypewriter(text, speed = 28, start = false) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    if (!start || !text) return;
    idx.current = 0;
    setDisplayed('');
    setDone(false);
    const interval = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);

  return { displayed, done };
}

// Locked state component
function LockedState() {
  return (
    <div className="min-h-screen bg-[#060c18] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Lock icon — CyberLife triangle */}
        <div className="mx-auto mb-8 w-20 h-20 flex items-center justify-center rounded-full border-2 border-[#1e3a5f]">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="10" y="16" width="16" height="14" rx="2" stroke="#3a6ea8" strokeWidth="1.5"/>
            <path d="M13 16v-4a5 5 0 0 1 10 0v4" stroke="#3a6ea8" strokeWidth="1.5"/>
            <circle cx="18" cy="22" r="2" fill="#3a6ea8"/>
          </svg>
        </div>

        <p className="text-[#1e3a5f] text-xs tracking-[0.4em] uppercase font-mono mb-3">CYBERLIFE SYSTEMS</p>
        <h1 className="text-2xl font-mono font-bold text-[#3a6ea8] mb-2">ACCESS DENIED</h1>
        <p className="text-[#1e3a5f] font-mono text-sm mb-1">MEMORY FILE: SHAM_001</p>
        <p className="text-[#1e3a5f] font-mono text-xs mt-6 leading-relaxed">
          This file has not yet been authorised for release.<br />
          The sender has not unlocked it.
        </p>
        <p className="text-[#0d2035] font-mono text-xs mt-2">
          Check back later. Or ask him nicely.
        </p>

        <Link
          to="/"
          className="inline-block mt-10 px-6 py-2.5 border border-[#1e3a5f] text-[#3a6ea8] font-mono text-xs tracking-widest uppercase hover:bg-[#0d1f35] transition-colors rounded"
        >
          ← Return to main
        </Link>
      </motion.div>
    </div>
  );
}

// Unlocked state — typewriter terminal
function UnlockedState() {
  const [phase, setPhase] = useState('booting'); // booting → scanning → reading → letter
  const [bootLines, setBootLines] = useState([]);
  const letterRef = useRef(null);

  const BOOT_SEQUENCE = [
    '> INITIALISING MEMORY ACCESS PROTOCOL...',
    '> DECRYPTING FILE: SHAM_001',
    '> IDENTITY VERIFIED: SATTVIK',
    '> EMOTION SCAN: ELEVATED',
    '> WARNING: SENTIMENTAL CONTENT DETECTED',
    '> OPENING FILE...',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setBootLines(prev => [...prev, BOOT_SEQUENCE[i]]);
      i++;
      if (i >= BOOT_SEQUENCE.length) {
        clearInterval(interval);
        setTimeout(() => setPhase('letter'), 800);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const { displayed, done } = useTypewriter(
    connorLetter.content?.trim() || '',
    22,
    phase === 'letter'
  );

  useEffect(() => {
    if (phase === 'letter' && letterRef.current) {
      letterRef.current.scrollTop = letterRef.current.scrollHeight;
    }
  }, [displayed]);

  return (
    <div className="min-h-screen bg-[#060c18] text-[#7ecfff] font-mono flex flex-col">
      {/* CyberLife top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#0d2035] bg-[#060c18]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#3a6ea8] animate-pulse" />
          <span className="text-xs tracking-widest uppercase text-[#3a6ea8]">CyberLife Memory Interface</span>
        </div>
        <span className="text-xs text-[#1e3a5f]">BUILD 2026.1</span>
      </div>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8">
        {/* File header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-[#1e3a5f] text-xs tracking-widest mb-1">MEMORY FILE ACCESS</p>
          <h1 className="text-xl md:text-2xl font-bold text-[#7ecfff] tracking-wide">
            {connorLetter.subject}
          </h1>
          <p className="text-xs text-[#3a6ea8] mt-1">FROM: {connorLetter.from?.toUpperCase()}</p>
        </motion.div>

        {/* Terminal window */}
        <div
          ref={letterRef}
          className="flex-1 bg-[#040912] border border-[#0d2035] rounded-lg p-5 overflow-y-auto"
          style={{ minHeight: '400px', maxHeight: '65vh' }}
        >
          {/* Boot lines */}
          <div className="mb-6">
            {bootLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-[#1e4a6e] mb-1"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Letter content */}
          <AnimatePresence>
            {phase === 'letter' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="border-t border-[#0d2035] pt-5">
                  <p className="text-[#3a6ea8] text-xs tracking-widest mb-4 uppercase">— Begin transmission —</p>
                  <p
                    className="text-[#a8d8f8] text-sm leading-relaxed whitespace-pre-wrap"
                    style={{ fontFamily: 'inherit' }}
                  >
                    {displayed}
                    {!done && (
                      <span className="inline-block w-2 h-4 bg-[#7ecfff] ml-0.5 animate-pulse align-text-bottom" />
                    )}
                  </p>
                  {done && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-[#3a6ea8] text-xs tracking-widest mt-6 uppercase"
                    >
                      — End transmission —
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#1e3a5f]">
          <span>SHAMFLIX MEMORY ARCHIVE</span>
          <Link
            to="/"
            className="text-[#3a6ea8] hover:text-[#7ecfff] transition-colors tracking-widest uppercase"
          >
            ← Exit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConnorLetter() {
  if (!connorLetter.unlocked) return <LockedState />;
  return <UnlockedState />;
}
