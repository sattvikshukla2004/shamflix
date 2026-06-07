// ============================================================
// src/components/features/SeasonQuizUnlock.jsx
// Quiz that must be passed to unlock a secret episode.
// quizSeason prop determines which question set to use.
// On pass → calls onUnlock(). On close → calls onClose().
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Unlock, CheckCircle, XCircle } from 'lucide-react';

// Season-specific quiz questions
const SEASON_QUIZZES = {
  1: {
    title: "Season 1 Unlock Quiz",
    subtitle: "Prove you were paying attention.",
    passMark: 3, // out of 5
    questions: [
      {
        q: "What was the first proper outing they went to together?",
        options: ["Cat cafe", "AnimeCon", "A movie", "Lalbagh park"],
        correct: 1,
      },
      {
        q: "Where did they celebrate her birthday when Sattvik was ill?",
        options: ["A restaurant", "Her PG", "At his place", "College canteen"],
        correct: 2,
      },
      {
        q: "What anime did Sattvik recommend that started the anime pipeline?",
        options: ["Naruto", "Horimiya", "Attack on Titan", "Your Name"],
        correct: 1,
      },
      {
        q: "What month did they first start hanging out in person?",
        options: ["November 2023", "January 2024", "February 2024", "June 2024"],
        correct: 2,
      },
      {
        q: "How did Sattvik and Sham first make contact?",
        options: ["She texted him first", "They met at an event", "She shared her number via a college counsellor form", "A mutual friend introduced them"],
        correct: 2,
      },
    ],
  },
};

export default function SeasonQuizUnlock({ quizSeason, onUnlock, onClose }) {
  const quiz = SEASON_QUIZZES[quizSeason] ?? SEASON_QUIZZES[1];
  const [step, setStep] = useState(0); // 0 = intro, 1..n = questions, n+1 = result
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const qIdx = step - 1;
  const question = quiz.questions[qIdx];
  const totalQ = quiz.questions.length;
  const isLastQ = qIdx === totalQ - 1;

  const score = answers.filter((a, i) => a === quiz.questions[i].correct).length;
  const passed = score >= quiz.passMark;

  const handleSelect = (idx) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
  };

  const handleNext = () => {
    setAnswers(prev => [...prev, selected]);
    setSelected(null);
    setRevealed(false);
    setStep(prev => prev + 1);
  };

  const handleFinish = () => {
    setAnswers(prev => [...prev, selected]);
    setStep(totalQ + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(26,46,59,0.7)', backdropFilter: 'blur(4px)' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'var(--color-bg-card)', border: '1.5px solid var(--color-border)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-secondary)' }}>
          <div className="flex items-center gap-2">
            <Lock size={16} style={{ color: 'var(--color-accent-primary)' }} />
            <span className="font-extrabold text-sm" style={{ color: 'var(--color-accent-deep)' }}>
              {quiz.title}
            </span>
          </div>
          <button onClick={onClose} className="opacity-40 hover:opacity-70 transition-opacity">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">

            {/* Intro */}
            {step === 0 && (
              <motion.div key="intro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="text-center py-4">
                <div className="text-5xl mb-4">🔒</div>
                <h2 className="text-xl font-extrabold mb-2" style={{ color: 'var(--color-accent-deep)' }}>
                  Secret Episode Locked
                </h2>
                <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {quiz.subtitle}
                </p>
                <p className="text-xs mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
                  Pass {quiz.passMark}/{totalQ} to unlock.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(1)}
                  className="px-8 py-3 rounded-xl font-bold text-white text-sm"
                  style={{ background: 'var(--color-accent-primary)' }}>
                  Start Quiz
                </motion.button>
              </motion.div>
            )}

            {/* Questions */}
            {step >= 1 && step <= totalQ && (
              <motion.div key={`q-${step}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                {/* Progress */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                    {step} / {totalQ}
                  </span>
                  <div className="flex gap-1">
                    {quiz.questions.map((_, i) => (
                      <div key={i} className="h-1.5 rounded-full transition-all"
                        style={{
                          width: '24px',
                          background: i < step - 1 ? 'var(--color-accent-primary)'
                            : i === step - 1 ? 'var(--color-accent-secondary)'
                            : 'var(--color-border)',
                        }} />
                    ))}
                  </div>
                </div>

                <p className="font-bold text-base mb-5 leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                  {question.q}
                </p>

                <div className="flex flex-col gap-2 mb-5">
                  {question.options.map((opt, i) => {
                    let borderColor = 'var(--color-border)';
                    let bg = 'var(--color-bg-secondary)';
                    let textColor = 'var(--color-text-primary)';
                    if (revealed) {
                      if (i === question.correct) { borderColor = '#22c55e'; bg = '#f0fdf4'; }
                      else if (i === selected) { borderColor = '#ef4444'; bg = '#fef2f2'; }
                    } else if (i === selected) {
                      borderColor = 'var(--color-accent-primary)';
                      bg = 'var(--color-card-hover)';
                    }
                    return (
                      <motion.button key={i} whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(i)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium border-2 transition-all"
                        style={{ borderColor, background: bg, color: textColor }}>
                        <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold"
                          style={{ borderColor }}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                        {revealed && i === question.correct && <CheckCircle size={14} className="ml-auto text-green-500 flex-shrink-0" />}
                        {revealed && i === selected && i !== question.correct && <XCircle size={14} className="ml-auto text-red-400 flex-shrink-0" />}
                      </motion.button>
                    );
                  })}
                </div>

                {revealed && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={isLastQ ? handleFinish : handleNext}
                      className="px-6 py-2.5 rounded-xl font-bold text-white text-sm"
                      style={{ background: 'var(--color-accent-primary)' }}>
                      {isLastQ ? 'See results' : 'Next →'}
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Result */}
            {step > totalQ && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4">
                {passed ? (
                  <>
                    <div className="text-5xl mb-3">🔓✨</div>
                    <h2 className="text-xl font-extrabold mb-2" style={{ color: 'var(--color-accent-deep)' }}>
                      You're in!
                    </h2>
                    <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                      {score}/{totalQ} — you actually know your stuff.
                    </p>
                    <p className="text-xs mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
                      The secret episode is now unlocked.
                    </p>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      onClick={onUnlock}
                      className="px-8 py-3 rounded-xl font-bold text-white text-sm"
                      style={{ background: 'var(--color-accent-primary)' }}>
                      Open the episode →
                    </motion.button>
                  </>
                ) : (
                  <>
                    <div className="text-5xl mb-3">😤</div>
                    <h2 className="text-xl font-extrabold mb-2" style={{ color: 'var(--color-accent-deep)' }}>
                      Not quite.
                    </h2>
                    <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                      {score}/{totalQ}. You need {quiz.passMark} to pass.
                    </p>
                    <p className="text-xs mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
                      Were you even paying attention in Season 1?
                    </p>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      onClick={() => { setStep(0); setAnswers([]); setSelected(null); setRevealed(false); }}
                      className="px-8 py-3 rounded-xl font-bold text-sm"
                      style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-accent-primary)', border: '1.5px solid var(--color-border)' }}>
                      Try again
                    </motion.button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
