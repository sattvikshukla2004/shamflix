// ============================================================
// src/pages/Home.jsx
// Home — per-profile seasons.
// Sattvik sees all 4 seasons. Riya sees her Season 0 + Seasons 1-4.
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { siteConfig, seasons, getRiyaSeasons } from '../data/data';
import { useBirthday } from '../hooks/useBirthday';
import { useProfile } from '../context/ProfileContext';
import BirthdaySplash from '../components/features/BirthdaySplash';
import IntroHero from '../components/home/IntroHero';
import SeasonRow from '../components/home/SeasonRow';
import LeonEasterEgg from '../components/features/LeonEasterEgg';

export default function Home() {
  const { shouldShowSplash, markSplashShown } = useBirthday();
  const [splashDismissed, setSplashDismissed] = useState(false);
  const { profile } = useProfile();

  const showSplash = shouldShowSplash && !splashDismissed;

  function handleEnter() {
    markSplashShown();
    setSplashDismissed(true);
  }

  // Per-profile content
  const activeSeasons = profile === 'riya' ? getRiyaSeasons() : seasons;

  const pageTitle = siteConfig.name;
  const tagline = siteConfig.tagline;

  return (
    <>
      <AnimatePresence>
        {showSplash && <BirthdaySplash onEnter={handleEnter} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="shamflix-container py-10"
      >
        {/* Page header */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold mb-2"
            style={{ color: 'var(--color-accent-deep)' }}
          >
            {pageTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg italic"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            "{tagline}"
          </motion.p>
        </div>

        {/* Intro hero */}
        <IntroHero />

        {/* Season rows */}
        {activeSeasons.map((season) => (
          <SeasonRow key={season.id} season={season} />
        ))}

        {/* Leon Easter Egg — hidden at bottom */}
        <div className="mt-10 mb-6 flex justify-start pl-1">
          <LeonEasterEgg />
        </div>
      </motion.div>
    </>
  );
}
