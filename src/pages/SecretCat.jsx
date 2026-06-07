import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { vaultConfig } from '../data/data';
import SecretVault, { SecretVaultInline } from '../components/features/SecretVault';

const _scImgs = import.meta.glob('../assets/secret/sc*.{jpg,jpeg,png,webp,gif}', { eager: true });
const _scVideos = import.meta.glob('../assets/secret/sc*.{mp4,webm,mov}', { eager: true, query: '?url', import: 'default' });

const CAT_MEDIA = [...Object.entries(_scImgs), ...Object.entries(_scVideos)]
  .sort(([a], [b]) => {
    const na = parseInt(a.match(/sc(\d+)/)?.[1] ?? 0);
    const nb = parseInt(b.match(/sc(\d+)/)?.[1] ?? 0);
    if (na !== nb) return na - nb;
    return a.localeCompare(b);
  })
  .map(([path, mod]) => ({
    type: /\.(mp4|webm|mov)$/i.test(path) ? 'video' : 'image',
    src: typeof mod === 'string' ? mod : mod.default,
  }));

const CAT_FACTS = [
  "Cats spend 70% of their lives asleep. Aspirational.",
  "A group of cats is called a clowder.",
  "Cats have 32 muscles in each ear. 32 more than your excuses.",
  "A cat's purr vibrates at 25-150 Hz. Cats are medicine.",
  "Cats can't taste sweetness. They simply don't need it.",
  "The oldest cat ever lived to 38. That's longer than most friendships.",
  "Cats slow-blink to say 'I love you'. You've been chosen.",
  "Cats have a third eyelid. Secret extra functionality.",
  "A cat's nose print is unique, like a fingerprint.",
  "Cats can jump 6x their own body length. Elite athletes.",
];

function CatLightbox({ media, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const go = (n) => setIdx(((n % media.length) + media.length) % media.length);
  const item = media[idx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: 'rgba(4,10,18,0.97)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
      >
        <X size={18} />
      </button>
      <button
        onClick={() => go(idx - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center hidden md:flex"
        style={{ background: 'rgba(255,255,255,0.12)', color: 'white' }}
      >
        <ChevronLeft size={20} />
      </button>
      {item.type === 'video' ? (
        <motion.video
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          src={item.src}
          controls
          autoPlay
          className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />
      ) : (
        <motion.img
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          src={item.src}
          alt={`cat ${idx + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />
      )}
      <button
        onClick={() => go(idx + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center hidden md:flex"
        style={{ background: 'rgba(255,255,255,0.12)', color: 'white' }}
      >
        <ChevronRight size={20} />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {idx + 1} / {media.length}
      </div>
    </motion.div>
  );
}

export default function SecretCat() {
  const [factIdx, setFactIdx] = useState(null);
  const [meowCount, setMeowCount] = useState(0);
  const [meowPops, setMeowPops] = useState([]);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [vaultOpen, setVaultOpen] = useState(false);

  const pullFact = () => {
    let next;
    do {
      next = Math.floor(Math.random() * CAT_FACTS.length);
    } while (next === factIdx && CAT_FACTS.length > 1);
    setFactIdx(next);
  };

  const handleMeow = (e) => {
    setMeowCount((c) => c + 1);
    try {
      const audio = new Audio('/meow.mp3');
      audio.volume = 0.7;
      audio.play().catch(() => {});
    } catch {}

    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setMeowPops((p) => [...p, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setMeowPops((p) => p.filter((x) => x.id !== id)), 900);
  };

  const vaultVideo = vaultConfig?.video && !vaultConfig.video.includes('PASTE') ? vaultConfig.video : null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="theme-secret min-h-screen pb-24"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        <div
          className="py-16 px-4 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%)', borderBottom: '1px solid var(--color-border)' }}
        >
          {/* Decorative cat paws floating */}
          {['🐾','🐾','✨','🐾','✨','🐾'].map((icon, i) => (
            <motion.span
              key={i}
              className="absolute text-lg select-none pointer-events-none"
              style={{ left: `${8 + i * 16}%`, top: i % 2 === 0 ? '15%' : '70%', opacity: 0.18 }}
              animate={{ y: [0, -8, 0], rotate: [0, i % 2 === 0 ? 10 : -10, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              {icon}
            </motion.span>
          ))}

          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260 }}
            whileHover={{ scale: 1.15, rotate: -8 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setVaultOpen(true)}
            className="absolute top-5 right-5 px-4 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-md"
            style={{ background: 'var(--color-bg-card)', border: '1.5px solid var(--color-border)', color: 'var(--color-accent-primary)' }}
            title="Open the Vault"
          >
            🔒 Vault
          </motion.button>

          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="text-5xl mb-4"
          >
            🐱
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xs uppercase tracking-[0.4em] mb-3 font-bold"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            ✦ Secret ✦
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black mb-3"
            style={{ color: 'var(--color-accent-deep)', textShadow: '0 2px 20px rgba(63,168,224,0.2)' }}
          >
            Welcome Ms baddie of the pride month
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-base max-w-sm mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            hehe congrats on making it here but i think you will wish u didnt
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-2 mt-4 text-xl"
          >
            {['🐾','🌊','🐱','🌊','🐾'].map((e, i) => (
              <motion.span key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >{e}</motion.span>
            ))}
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto px-4 pt-10 space-y-14">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
              {meowCount === 0 ? 'Press it.' : `${meowCount} meow${meowCount > 1 ? 's' : ''} and counting`}
            </p>
            <div className="relative inline-block">
              <motion.button
                onClick={handleMeow}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                className="relative px-10 py-5 rounded-2xl font-black text-xl text-white shadow-lg overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-deep))' }}
              >
                MEOW
                <AnimatePresence>
                  {meowPops.map((p) => (
                    <motion.span
                      key={p.id}
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -50, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.85 }}
                      className="absolute text-sm font-bold text-white pointer-events-none"
                      style={{ left: p.x - 20, top: p.y - 30 }}
                    >
                      meow!
                    </motion.span>
                  ))}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
              Cat facts
            </p>
            <motion.button
              onClick={pullFact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl font-semibold text-sm mb-5 transition-colors"
              style={{ border: '2px solid var(--color-border)', color: 'var(--color-accent-primary)', background: 'var(--color-bg-card)' }}
            >
              Get a cat fact
            </motion.button>
            <AnimatePresence mode="wait">
              {factIdx !== null && (
                <motion.div
                  key={factIdx}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-md mx-auto rounded-2xl px-6 py-5 shadow-sm"
                  style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                >
                  <p className="font-medium text-base leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                    {CAT_FACTS[factIdx]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-center mb-5" style={{ color: 'var(--color-text-tertiary)' }}>
              The Catalogue
            </p>
            {CAT_MEDIA.length > 0 ? (
              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 gap-3"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
              >
                {CAT_MEDIA.map((item, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    variants={{ hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200 } } }}
                    whileHover={{ scale: 1.08, rotate: i % 2 === 0 ? 3 : -3 }}
                    className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
                    style={{ border: '1.5px solid var(--color-border)' }}
                  >
                    {item.type === 'video' ? (
                      <>
                        <video
                          src={item.src}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <span className="w-10 h-10 rounded-full flex items-center justify-center bg-black/55 text-white">
                            <Play size={18} fill="currentColor" />
                          </span>
                        </div>
                      </>
                    ) : (
                      <img src={item.src} alt={`cat ${i + 1}`} className="w-full h-full object-cover" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 gap-4"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    variants={{ hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200 } } }}
                    whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                    className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 text-xs font-bold"
                    style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
                  >
                    CAT
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-center mb-5" style={{ color: 'var(--color-text-tertiary)' }}>
              Secret Vault
            </p>
            <SecretVaultInline />
          </div>

          <div className="text-center">
            <Link to="/" className="text-sm font-semibold hover:underline" style={{ color: 'var(--color-accent-primary)' }}>
              Back to Shamflix
            </Link>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxIdx !== null && CAT_MEDIA.length > 0 && (
          <CatLightbox media={CAT_MEDIA} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {vaultOpen && (
          <SecretVault vaultVideo={vaultVideo} onClose={() => setVaultOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
