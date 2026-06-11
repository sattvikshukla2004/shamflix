// ============================================================
// src/components/features/SecretVault.jsx
// Passcode 106 → vault gallery with 4 sections (sv1, sv2, sv3, sv4)
// Photos: src/assets/vault/sv1p1.jpg, sv1p2.jpg, sv2p1.jpg...
// Videos: src/assets/vault/sv1v1.mp4, sv2v1.mp4...
// vault_cover.jpg = left panel image on passcode screen
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { vaultSections, getSVMedia } from '../../data/data';

// ── Asset helpers ────────────────────────────────────────────
const _vaultAssets = import.meta.glob('../../assets/vault/vault_*.{jpg,jpeg,png,webp}', { eager: true });
const getVaultAsset = (name) => {
  const entry = Object.entries(_vaultAssets).find(([p]) => p.includes(name));
  return entry ? entry[1].default : null;
};

const VAULT_CODE = '106';

// ── Lightbox ─────────────────────────────────────────────────
function MediaLightbox({ items, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const go = (n) => setIdx(((n % items.length) + items.length) % items.length);
  const item = items[idx];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft') go(idx - 1);
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [idx]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: 'rgba(4,10,18,0.97)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10"
        style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
        <X size={18} />
      </button>

      {items.length > 1 && (
        <>
          <button onClick={() => go(idx - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full hidden md:flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'white' }}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => go(idx + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full hidden md:flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'white' }}>
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="max-w-4xl w-full flex flex-col items-center gap-3">
        {item.type === 'video' ? (
          <video
            src={item.src}
            controls
            autoPlay
            className="max-h-[80vh] w-full rounded-xl shadow-2xl"
          />
        ) : (
          <motion.img
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={item.src}
            alt={`item ${idx + 1}`}
            className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
          />
        )}
        <div className="text-white/50 text-xs">{idx + 1} / {items.length}</div>
      </div>

      {/* Mobile swipe dots */}
      {items.length > 1 && (
        <div className="absolute bottom-8 flex gap-2 md:hidden">
          {items.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: i === idx ? 'white' : 'rgba(255,255,255,0.35)' }} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Section gallery ──────────────────────────────────────────
function VaultSection({ section, onBack }) {
  const allMedia = getSVMedia(section.id);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition-opacity"
          style={{ color: 'var(--color-accent-primary)' }}>
          <ChevronLeft size={16} />
          Back
        </button>
        <div className="flex-1 text-center">
          <span className="text-lg mr-2">{section.emoji}</span>
          <span className="font-extrabold" style={{ color: 'var(--color-accent-deep)' }}>{section.title}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-center px-6 pt-4 pb-2" style={{ color: 'var(--color-text-secondary)' }}>
        {section.description}
      </p>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {allMedia.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2">
            <span className="text-3xl">📭</span>
            <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              Add {section.title.toLowerCase()} files as sv{section.id}p1.jpg, sv{section.id}p2.jpg...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {allMedia.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLightboxIdx(i)}
                className="aspect-square rounded-xl overflow-hidden relative"
                style={{ background: 'var(--color-bg-secondary)', border: '1.5px solid var(--color-border)' }}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full relative">
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="w-9 h-9 rounded-full flex items-center justify-center bg-black/55 text-white">
                        <Play size={16} fill="currentColor" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <img src={item.src} alt="" className="w-full h-full object-cover" />
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <MediaLightbox
            items={allMedia}
            startIdx={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Sections list ────────────────────────────────────────────
function VaultHome({ onSelect, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-2">
          <Lock size={18} style={{ color: 'var(--color-accent-primary)' }} />
          <span className="font-extrabold text-lg" style={{ color: 'var(--color-accent-deep)' }}>Secret Vault</span>
        </div>
        <button onClick={onClose} className="hover:opacity-60 transition-opacity" aria-label="Close">
          <X size={20} style={{ color: 'var(--color-text-secondary)' }} />
        </button>
      </div>

      <p className="text-sm text-center px-6 pt-4" style={{ color: 'var(--color-text-secondary)' }}>
        The classified archives. You unlocked it. Good job.
      </p>

      <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
          {vaultSections.map((section) => {
            const total = getSVMedia(section.id).length;
            return (
              <motion.button
                key={section.id}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(90,173,226,0.18)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(section)}
                className="rounded-2xl p-4 flex flex-col gap-2 text-left"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1.5px solid var(--color-border)',
                }}
              >
                <span className="text-2xl">{section.emoji}</span>
                <div>
                  <div className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>{section.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                    {total > 0 ? `${total} item${total !== 1 ? 's' : ''}` : 'Coming soon'}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ── Passcode pad ─────────────────────────────────────────────
function PasscodePad({ onSuccess }) {
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const [showAngry, setShowAngry] = useState(false);
  const coverImg = getVaultAsset('vault_cover');
  const angryImg = getVaultAsset("vault_angry.jpg");

  const press = (d) => {
    if (input.length >= VAULT_CODE.length) return;
    const next = input + d;
    setInput(next);
    if (next === VAULT_CODE) {
      setTimeout(() => onSuccess(), 300);
    } else if (next.length >= VAULT_CODE.length) {
      setShake(true);
      setShowAngry(true);
      setTimeout(() => {
        setShake(false);
        setShowAngry(false);
        setInput("");
      }, 1500);
    }
  };

  const del = () => setInput(i => i.slice(0, -1));

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Left — cover image */}
      <div
        className="hidden md:flex w-2/5 items-center justify-center overflow-hidden rounded-l-2xl"
        style={{ background: "var(--color-bg-secondary)" }}
      >
        {showAngry && angryImg ? (
          <img
            src={angryImg}
            alt="angry"
            className="w-full h-full object-cover"
          />
        ) : coverImg ? (
          <img
            src={coverImg}
            alt="vault"
            className="w-full h-full object-cover"
          />
        ) : (
          <Lock size={64} style={{ color: "var(--color-border)" }} />
        )}
      </div>

      {/* Right — keypad */}
      <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8">
        <Lock size={28} style={{ color: "var(--color-accent-primary)" }} />
        <h2
          className="text-xl font-extrabold"
          style={{ color: "var(--color-accent-deep)" }}
        >
          Secret Vault
        </h2>
        <p
          className="text-sm text-center"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Enter the code to unlock
        </p>

        {/* Display */}
        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex gap-3"
        >
          {Array.from({ length: VAULT_CODE.length }).map((_, i) => (
            <div
              key={i}
              className="w-11 h-11 rounded-xl border-2 flex items-center justify-center text-lg font-bold"
              style={{
                borderColor: input[i]
                  ? "var(--color-accent-primary)"
                  : "var(--color-border)",
                color: "var(--color-accent-deep)",
                background: input[i]
                  ? "var(--color-bg-secondary)"
                  : "transparent",
              }}
            >
              {input[i] ? "●" : ""}
            </div>
          ))}
        </motion.div>

        {/* Number grid */}
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <motion.button
              key={n}
              whileTap={{ scale: 0.9 }}
              onClick={() => press(String(n))}
              className="w-14 h-14 rounded-2xl text-lg font-bold transition-colors"
              style={{
                background: "var(--color-bg-secondary)",
                color: "var(--color-accent-deep)",
                border: "1.5px solid var(--color-border)",
              }}
            >
              {n}
            </motion.button>
          ))}
          {/* Bottom row */}
          <div />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => press("0")}
            className="w-14 h-14 rounded-2xl text-lg font-bold"
            style={{
              background: "var(--color-bg-secondary)",
              color: "var(--color-accent-deep)",
              border: "1.5px solid var(--color-border)",
            }}
          >
            0
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={del}
            className="w-14 h-14 rounded-2xl text-sm"
            style={{
              background: "var(--color-bg-secondary)",
              color: "var(--color-text-secondary)",
              border: "1.5px solid var(--color-border)",
            }}
          >
            ⌫
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ── Modal export (overlay) ───────────────────────────────────
export default function SecretVault({ onClose }) {
  const [stage, setStage] = useState('passcode'); // passcode | vault | section
  const [activeSection, setActiveSection] = useState(null);

  const handleUnlock = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#5AADE2', '#7BC8F6', '#2E86C1', '#fff'] });
    setStage('vault');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[400] flex items-center justify-center p-4"
        style={{ background: 'rgba(26,46,59,0.65)', backdropFilter: 'blur(4px)' }}
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'var(--color-bg-card)',
            border: '1.5px solid var(--color-border)',
            height: '520px',
            maxHeight: '90vh',
          }}
        >
          <AnimatePresence mode="wait">
            {stage === 'passcode' && (
              <motion.div key="passcode" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="h-full relative">
                  {onClose && (
                    <button onClick={onClose}
                      className="absolute top-3 right-3 z-10 opacity-40 hover:opacity-70 transition-opacity"
                      aria-label="Close">
                      <X size={18} />
                    </button>
                  )}
                  <PasscodePad onSuccess={handleUnlock} />
                </div>
              </motion.div>
            )}
            {stage === 'vault' && !activeSection && (
              <motion.div key="vault-home" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <VaultHome
                  onSelect={(s) => { setActiveSection(s); setStage('section'); }}
                  onClose={onClose}
                />
              </motion.div>
            )}
            {stage === 'section' && activeSection && (
              <motion.div key={`section-${activeSection.id}`} className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <VaultSection
                  section={activeSection}
                  onBack={() => { setActiveSection(null); setStage('vault'); }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Inline export (embedded directly in page) ────────────────
export function SecretVaultInline() {
  const [stage, setStage] = useState('passcode'); // passcode | vault | section
  const [activeSection, setActiveSection] = useState(null);

  const handleUnlock = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.9 }, colors: ['#5AADE2', '#7BC8F6', '#2E86C1', '#fff'] });
    setStage('vault');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl overflow-hidden shadow-xl"
      style={{
        background: 'var(--color-bg-card)',
        border: '1.5px solid var(--color-border)',
        minHeight: '480px',
      }}
    >
      <AnimatePresence mode="wait">
        {stage === 'passcode' && (
          <motion.div key="passcode" className="h-full" style={{ minHeight: '480px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PasscodePad onSuccess={handleUnlock} />
          </motion.div>
        )}
        {stage === 'vault' && !activeSection && (
          <motion.div key="vault-home" style={{ minHeight: '480px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VaultHome
              onSelect={(s) => { setActiveSection(s); setStage('section'); }}
              onClose={null}
            />
          </motion.div>
        )}
        {stage === 'section' && activeSection && (
          <motion.div key={`section-${activeSection.id}`} style={{ minHeight: '480px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VaultSection
              section={activeSection}
              onBack={() => { setActiveSection(null); setStage('vault'); }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
