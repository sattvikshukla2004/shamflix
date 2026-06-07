// ============================================================
// src/components/features/ProfileSelect.jsx
// Full-screen "Who am I?" profile selector shown on first load.
// Two profile cards: Sattvik (pastel pink) and Riya (coffee brown).
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../context/ProfileContext';

// Auto-detect profile photos from src/assets/profiles/
// Name your files: sattvik.jpg and riya.jpg
const _profilePhotos = import.meta.glob(
  ['../../assets/profiles/*.jpg', '../../assets/profiles/*.jpeg', '../../assets/profiles/*.png', '../../assets/profiles/*.webp'],
  { eager: true }
);

function getProfilePhoto(name) {
  const key = Object.keys(_profilePhotos).find(k => k.toLowerCase().includes(`/${name.toLowerCase()}.`) || k.toLowerCase().includes(`/${name.toLowerCase()}p.`));
  return key ? _profilePhotos[key].default : null;
}

const sattivkPhoto = getProfilePhoto('sattvik');
const riyaPhoto = getProfilePhoto('riya');

// Falling petal decoration for the selector background
function SelectorPetal({ style }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: '50% 0 50% 0',
        background: 'rgba(255, 182, 193, 0.5)',
        ...style,
      }}
      animate={{ y: ['0vh', '110vh'], rotate: [0, 360], opacity: [0.7, 0.2] }}
      transition={{
        duration: style.duration,
        delay: style.delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 5.7 + Math.sin(i) * 8) % 100}%`,
  top: `-${10 + (i % 5) * 8}%`,
  duration: 6 + (i % 4) * 2,
  delay: i * 0.4,
}));

// Coffee steam decoration for Riya side
function CoffeeSteam({ x, delay }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: '60%',
        left: x,
        width: 3,
        borderRadius: 99,
        background: 'rgba(160, 114, 74, 0.25)',
      }}
      animate={{ height: [0, 24, 0], y: [0, -20], opacity: [0, 0.6, 0] }}
      transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

const profiles = [
  {
    id: 'sattvik',
    name: 'Sattvik',
    patientLabel: 'Patient 01',
    emoji: '🌸',
    photo: sattivkPhoto,
    initial: 'S',
    cardBg: 'linear-gradient(145deg, #FFF0F5 0%, #FFD6E8 60%, #FFB6C1 100%)',
    glowColor: 'rgba(255, 133, 161, 0.5)',
    accentColor: '#C2185B',
    borderColor: '#FF85A1',
    badgeBg: 'rgba(194, 24, 91, 0.12)',
    badgeColor: '#C2185B',
    initialBg: 'linear-gradient(135deg, #FF85A1, #C2185B)',
  },
  {
    id: 'riya',
    name: 'Riya',
    patientLabel: 'Patient 02',
    emoji: '☕',
    photo: riyaPhoto,
    initial: 'R',
    cardBg: 'linear-gradient(145deg, #FAF3E8 0%, #F2E4CE 60%, #E8D5B7 100%)',
    glowColor: 'rgba(160, 114, 74, 0.45)',
    accentColor: '#6B4226',
    borderColor: '#A0724A',
    badgeBg: 'rgba(107, 66, 38, 0.12)',
    badgeColor: '#6B4226',
    initialBg: 'linear-gradient(135deg, #A0724A, #6B4226)',
  },
];

function ProfileCard({ profile, onSelect, isSelected }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      id={`profile-card-${profile.id}`}
      onClick={() => onSelect(profile.id)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="relative focus-visible:outline-none flex flex-col items-center"
      style={{
        width: '100%',
        maxWidth: 260,
        borderRadius: 28,
        padding: '2rem 1.5rem 1.75rem',
        background: profile.cardBg,
        border: `2px solid ${hovered || isSelected ? profile.borderColor : 'rgba(255,255,255,0.6)'}`,
        boxShadow: hovered || isSelected
          ? `0 24px 60px ${profile.glowColor}, 0 0 0 4px ${profile.borderColor}22`
          : `0 8px 32px ${profile.glowColor}55, 0 2px 8px rgba(0,0,0,0.06)`,
        cursor: 'url(/cat-cursor-pointer.png), pointer',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Photo / Initial avatar */}
      <div
        className="relative mb-5"
        style={{
          width: 110,
          height: 110,
          borderRadius: '50%',
          border: `3px solid ${profile.borderColor}`,
          boxShadow: `0 0 24px ${profile.glowColor}`,
          overflow: 'hidden',
          background: profile.initialBg,
          flexShrink: 0,
        }}
      >
        {profile.photo ? (
          <img
            src={profile.photo}
            alt={profile.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.8rem',
              fontWeight: 900,
              color: 'white',
              fontFamily: "'Segoe UI', system-ui, sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            {profile.initial}
          </div>
        )}

        {/* Emoji badge */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: -4,
            right: -4,
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'white',
            border: `2px solid ${profile.borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
          animate={{ scale: hovered ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.4 }}
        >
          {profile.emoji}
        </motion.div>
      </div>

      {/* Coffee steam (Riya only) */}
      {profile.id === 'riya' && (
        <div style={{ position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)' }}>
          <CoffeeSteam x="40%" delay={0} />
          <CoffeeSteam x="55%" delay={0.6} />
          <CoffeeSteam x="70%" delay={1.1} />
        </div>
      )}

      {/* Name */}
      <h2
        style={{
          fontSize: '1.65rem',
          fontWeight: 900,
          color: profile.accentColor,
          letterSpacing: '-0.02em',
          marginBottom: '0.2rem',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}
      >
        {profile.name}
      </h2>

      {/* Patient label */}
      <p
        style={{
          fontSize: '0.68rem',
          color: profile.accentColor,
          opacity: 0.55,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '0.25rem',
        }}
      >
        {profile.patientLabel}
      </p>

      {/* Select button */}
      <motion.div
        animate={{ scale: hovered ? 1.04 : 1 }}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1.5rem',
          borderRadius: 999,
          background: profile.badgeBg,
          border: `1.5px solid ${profile.borderColor}`,
          color: profile.accentColor,
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        Sign in
      </motion.div>
    </motion.button>
  );
}

export default function ProfileSelect() {
  const { setProfile } = useProfile();
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
    setTimeout(() => setProfile(id), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'linear-gradient(160deg, #FFF0F5 0%, #FAF3E8 40%, #FFF0F5 70%, #F2E4CE 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '1rem',
      }}
    >
      {/* Ambient petals in background */}
      {PETALS.map((p, i) => (
        <SelectorPetal key={i} style={p} />
      ))}

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,182,193,0.3) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '8%',
        width: 260, height: 260, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(160,114,74,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="text-center mb-12 relative z-10"
      >
        {/* Logo paw */}
        <motion.div
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '2.5rem', marginBottom: '0.75rem', display: 'block' }}
        >
          🧠
        </motion.div>

        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #C2185B 0%, #A0724A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.03em',
            marginBottom: '0.4rem',
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          Mental Asylum
        </h1>
        <p
          style={{
            fontSize: '0.8rem',
            color: '#8a6a5a',
            opacity: 0.7,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '0.3rem',
          }}
        >
          Patient identification required
        </p>
        <p
          style={{
            fontSize: '0.85rem',
            color: '#8a6a5a',
            fontStyle: 'italic',
            opacity: 0.75,
          }}
        >
          Who are you today?
        </p>
      </motion.div>

      {/* Profile cards */}
      <div
        className="relative z-10 flex gap-6 flex-wrap justify-center"
        style={{ maxWidth: 600 }}
      >
        <AnimatePresence>
          {profiles.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.15, type: 'spring', stiffness: 240, damping: 22 }}
            >
              <ProfileCard
                profile={p}
                onSelect={handleSelect}
                isSelected={selected === p.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          fontSize: '0.72rem',
          color: '#a08070',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        Shamflix · 3 years · happy autistic family
      </motion.p>

      {/* Selected overlay flash */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: selected === 'sattvik'
                ? 'rgba(255, 182, 193, 0.35)'
                : 'rgba(160, 114, 74, 0.25)',
              backdropFilter: 'blur(4px)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
