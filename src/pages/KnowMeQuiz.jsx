import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Gift, ArrowLeft, RotateCcw, Star } from 'lucide-react';
import { knowMeQuizData, riyaKnowMeQuizData } from '../data/data';
import { useProfile } from '../context/ProfileContext';
import confetti from 'canvas-confetti';

export default function KnowMeQuiz() {
  const { profile } = useProfile();
  const quizData = profile === 'riya' ? riyaKnowMeQuizData : knowMeQuizData;
  const { title, subtitle, giftThreshold, giftMessage, giftEmoji, questions } = quizData;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showGift, setShowGift] = useState(false);

  const total = questions.length;
  const q = questions[current];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.correctIndex;

    setTimeout(() => {
      const newResults = [...results, { correct }];
      if (current + 1 >= total) {
        setResults(newResults);
        setShowResult(true);
        const score = Math.round((newResults.filter((r) => r.correct).length / total) * 100);
        if (score === 100) {
          setTimeout(() => {
            const colors = profile === 'riya'
              ? ['#A0724A', '#C4956A', '#F4C430', '#fff', '#6B4226']
              : ['#FF85A1', '#FFB6C1', '#F4C430', '#fff', '#C2185B'];
            confetti({ particleCount: 180, spread: 80, origin: { y: 0.6 }, colors });
          }, 400);
        }
      } else {
        setResults(newResults);
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 900);
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setResults([]);
    setShowResult(false);
    setShowGift(false);
  };

  const correctCount = results.filter((r) => r.correct).length;
  const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const passed = score === 100;

  const getScoreLabel = () => {
    if (score === 100) return { label: 'Perfect score.', color: '#22c55e' };
    if (score >= 80) return { label: 'You actually pay attention.', color: '#22c55e' };
    if (score >= 60) return { label: 'Decent. Could be worse.', color: '#F4C430' };
    if (score >= 40) return { label: 'We need to talk.', color: '#f97316' };
    return { label: profile === 'riya' ? 'Do you even know her?' : 'Do you even know him?', color: '#ef4444' };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="shamflix-container py-10 max-w-2xl mx-auto"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 transition-colors hover:underline"
        style={{ color: 'var(--color-accent-primary)' }}
      >
        <ArrowLeft size={14} /> Back
      </Link>

      <AnimatePresence mode="wait">
        {showResult ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-extrabold"
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-deep))',
                  color: '#fff',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                }}
              >
                {score}%
              </div>
              <p className="text-base font-semibold" style={{ color: getScoreLabel().color }}>
                {getScoreLabel().label}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {correctCount} / {total} correct
              </p>
              {score === 100 && (
                <p className="text-sm font-bold" style={{ color: '#22c55e' }}>
                  Congrats, your gift is unlocked! 🎉
                </p>
              )}
            </div>

            <div
              className="rounded-xl p-4 space-y-2 text-left"
              style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
            >
              {questions.map((qq, i) => (
                <div key={i} className="flex items-start gap-2">
                  {results[i]?.correct ? (
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#22c55e' }} />
                  ) : (
                    <XCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#ef4444' }} />
                  )}
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {qq.question}
                    </p>
                    {!results[i]?.correct && (
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-accent-primary)' }}>
                        Correct answer: {qq.options[qq.correctIndex]}
                      </p>
                    )}
                    <p className="text-xs italic mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                      {qq.funFact}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {passed && !showGift && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setShowGift(true)}
                className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 text-sm transition-transform hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #F4C430, #e6a817)', boxShadow: '0 4px 20px rgba(244,196,48,0.4)' }}
              >
                <Gift size={18} /> {giftEmoji} Gift
              </motion.button>
            )}

            {passed && showGift && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-6 text-center space-y-3"
                style={{ background: 'linear-gradient(135deg, #FFF9E6, #FFF3CC)', border: '2px solid #F4C430' }}
              >
                <p className="text-3xl">{giftEmoji}</p>
                <p className="text-base font-bold" style={{ color: '#8B6914' }}>Your reward:</p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#6B5010' }}>
                  {giftMessage && !giftMessage.includes('PASTE')
                    ? giftMessage
                    : '(Gift message has not been filled in yet.)'}
                </p>
              </motion.div>
            )}

            {!passed && (
              <p className="text-sm italic" style={{ color: 'var(--color-text-tertiary)' }}>
                Get all {total} correct to unlock the gift
              </p>
            )}

            <button
              onClick={reset}
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-accent-primary)', border: '1px solid var(--color-border)' }}
            >
              <RotateCcw size={14} /> Try again
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`q-${current}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold mb-1" style={{ color: 'var(--color-accent-deep)' }}>
                {title}
              </h1>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--color-border)' }}>
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(current / total) * 100}%`, background: 'var(--color-accent-primary)' }}
                />
              </div>
              <span className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                {current + 1} / {total}
              </span>
            </div>

            <div
              className="rounded-2xl p-5 mb-5"
              style={{ background: 'var(--color-bg-card)', border: '1.5px solid var(--color-border)' }}
            >
              <div className="flex items-start gap-2 mb-1">
                <Star size={14} style={{ color: 'var(--color-accent-primary)', marginTop: 3, flexShrink: 0 }} />
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                  Question {current + 1}
                </p>
              </div>
              <p className="text-lg font-bold leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                {q.question}
              </p>
            </div>

            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                let bg = 'var(--color-bg-card)';
                let border = 'var(--color-border)';
                let textColor = 'var(--color-text-primary)';
                if (selected !== null) {
                  if (idx === q.correctIndex) {
                    bg = '#dcfce7';
                    border = '#22c55e';
                    textColor = '#166534';
                  } else if (idx === selected) {
                    bg = '#fee2e2';
                    border = '#ef4444';
                    textColor = '#991b1b';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={selected === null ? { scale: 1.02 } : {}}
                    whileTap={selected === null ? { scale: 0.98 } : {}}
                    onClick={() => handleSelect(idx)}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{ background: bg, border: `1.5px solid ${border}`, color: textColor, cursor: selected !== null ? 'default' : undefined }}
                  >
                    <span className="mr-2 font-bold" style={{ color: 'var(--color-accent-primary)' }}>
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                    {selected !== null && idx === q.correctIndex && (
                      <CheckCircle size={14} className="inline ml-2" style={{ color: '#22c55e' }} />
                    )}
                    {selected === idx && idx !== q.correctIndex && (
                      <XCircle size={14} className="inline ml-2" style={{ color: '#ef4444' }} />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-xl px-4 py-3 text-sm italic"
                  style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                >
                  {q.funFact}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
