// src/pages/Quiz.jsx — SHIFT 5 COMPLETE
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { jkkQuizQuestions, jkkQuizResults } from '../data/data.js';

const CHARACTER_COLORS = {
  nanami: { bg: '#2E4A3E', accent: '#7EC8A0', label: '#B8E8CC' },
  gojo:   { bg: '#1A1A3E', accent: '#7BC8F6', label: '#C8E8FF' },
  higuruma: { bg: '#3E2A1A', accent: '#E8A870', label: '#F5D4B8' },
  toji:   { bg: '#1E1E1E', accent: '#C8C8C8', label: '#EEEEEE' },
};

const CHARACTER_EMOJI = {
  nanami: '🎴',
  gojo:   '🌟',
  higuruma: '⚖️',
  toji:   '🗡️',
};

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]); // array of character strings
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward

  const total = jkkQuizQuestions.length;

  const handleSelect = (character) => {
    if (selected) return;
    setSelected(character);
    setTimeout(() => {
      const newAnswers = [...answers, character];
      if (currentQ + 1 >= total) {
        setAnswers(newAnswers);
        setShowResult(true);
      } else {
        setAnswers(newAnswers);
        setDirection(1);
        setCurrentQ(q => q + 1);
        setSelected(null);
      }
    }, 700);
  };

  const getResult = () => {
    const counts = {};
    answers.forEach(c => { counts[c] = (counts[c] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setShowResult(false);
    setDirection(-1);
  };

  const resultKey = showResult ? getResult() : null;
  const result = resultKey ? jkkQuizResults[resultKey] : null;
  const colors = resultKey ? CHARACTER_COLORS[resultKey] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-bg-primary pb-24"
    >
      {/* Header */}
      <div className="bg-bg-secondary border-b border-[#C8E3F5] py-10 px-4 text-center">
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#5AADE2] mb-2">SHAMFLIX EXTRAS</p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A2E3B] mb-2">Which JJK character are you?</h1>
        <p className="text-[#4A6B82] text-base max-w-md mx-auto">5 questions. No wrong answers. (Some wrong answers.)</p>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-10">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`question-${currentQ}`}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Progress */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-2 bg-[#E1F0FB] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#5AADE2]"
                    initial={{ width: `${(currentQ / total) * 100}%` }}
                    animate={{ width: `${((currentQ + 1) / total) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#8AAEC4] whitespace-nowrap">
                  {currentQ + 1} / {total}
                </span>
              </div>

              {/* Question */}
              <h2 className="text-xl md:text-2xl font-bold text-[#1A2E3B] mb-7 leading-snug">
                {jkkQuizQuestions[currentQ].question}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {jkkQuizQuestions[currentQ].options.map((opt, i) => {
                  const isSelected = selected === opt.character;
                  const isOther = selected && selected !== opt.character;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(opt.character)}
                      disabled={!!selected}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: isOther ? 0.4 : 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                      whileHover={!selected ? { scale: 1.02, x: 4 } : {}}
                      whileTap={!selected ? { scale: 0.98 } : {}}
                      className="w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-[15px]"
                      style={{
                        borderColor: isSelected ? '#5AADE2' : '#C8E3F5',
                        backgroundColor: isSelected ? '#E1F0FB' : 'white',
                        color: isSelected ? '#2E86C1' : '#1A2E3B',
                      }}
                    >
                      <span className="mr-3 text-[#8AAEC4] text-sm font-mono">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt.text}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Result card */
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            >
              <div
                className="rounded-3xl overflow-hidden shadow-xl"
                style={{ backgroundColor: colors.bg }}
              >
                {/* Top section */}
                <div className="px-8 pt-10 pb-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="text-7xl mb-4"
                  >
                    {CHARACTER_EMOJI[resultKey]}
                  </motion.div>
                  <p className="text-xs font-bold tracking-[0.3em] uppercase mb-2" style={{ color: colors.accent }}>
                    You are
                  </p>
                  <h2 className="text-3xl md:text-4xl font-black mb-1" style={{ color: colors.label }}>
                    {result.name}
                  </h2>
                  <p className="text-base font-semibold mb-6" style={{ color: colors.accent }}>
                    {result.title}
                  </p>
                  <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: colors.label, opacity: 0.85 }}>
                    {result.description}
                  </p>
                </div>

                {/* Quote strip */}
                <div
                  className="mx-6 mb-8 rounded-2xl px-6 py-4"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderLeft: `3px solid ${colors.accent}` }}
                >
                  <p className="text-sm italic" style={{ color: colors.accent }}>
                    "{result.quote}"
                  </p>
                </div>
              </div>

              {/* Retake button */}
              <div className="flex justify-center mt-6 gap-3">
                <button
                  onClick={restart}
                  className="px-7 py-3 rounded-xl font-bold border-2 border-[#5AADE2] text-[#5AADE2] bg-white hover:bg-[#E1F0FB] transition-colors"
                >
                  🔄 Retake quiz
                </button>
                <Link
                  to="/"
                  className="px-7 py-3 rounded-xl font-bold bg-[#5AADE2] text-white hover:bg-[#2E86C1] transition-colors"
                >
                  Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
