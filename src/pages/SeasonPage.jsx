// ============================================================
// src/pages/SeasonPage.jsx
// Full season view — banner, host character card, 3-col episode grid.
// All episodes openable via EpisodeModal.
// ============================================================

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Quote } from 'lucide-react';
import { seasons, getRiyaSeasons, getSeasonGuide } from '../data/data';
import { useProfile } from '../context/ProfileContext';
import EpisodeCard from '../components/home/EpisodeCard';


const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function SeasonPage() {
  const { seasonId } = useParams();
  const { profile } = useProfile();

  // Search the correct season pool based on profile
  const allSeasons = profile === 'riya' ? getRiyaSeasons() : seasons;
  const season = allSeasons.find(s => s.id === seasonId);


  if (!season) {
    return (
      <div className="shamflix-container py-20 text-center">
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Season not found. <Link to="/" className="underline" style={{ color: 'var(--color-accent-primary)' }}>Go home</Link>
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="shamflix-container py-10"
    >
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 transition-colors hover:underline"
        style={{ color: 'var(--color-accent-primary)' }}
      >
        <ArrowLeft size={14} />
        Back to home
      </Link>

      {/* Season banner */}
      {(() => {
        const guideImg = getSeasonGuide(season.number);
        return (
          <div
            className="rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-card) 100%)',
              border: '1.5px solid var(--color-border)',
            }}
          >
            {guideImg && (
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url(${guideImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.18,
                }}
              />
            )}
        <div className="flex flex-col md:flex-row md:items-start md:gap-8 relative z-10">
          {/* Season info */}
          <div className="flex-1 space-y-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              Season {season.number === 0 ? '0' : season.number} · {season.period}
            </p>
            <h1
              className="text-3xl md:text-4xl font-extrabold leading-tight"
              style={{ color: 'var(--color-accent-deep)' }}
            >
              {season.title}
            </h1>
            <p
              className="text-base italic"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              "{season.subtitle}"
            </p>
            <p
              className="text-sm leading-relaxed max-w-2xl pt-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {season.description}
            </p>
            <p
              className="text-xs pt-1"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              {season.episodes.length} episode{season.episodes.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Host character card */}
          {season.hostCharacter && (
            <div
              className="mt-6 md:mt-0 flex-shrink-0 rounded-xl overflow-hidden md:w-56"
              style={{
                background: 'var(--color-bg-card)',
                border: '1.5px solid var(--color-border)',
              }}
            >
              {/* Character image */}
              {season.hostCharacter.image && !season.hostCharacter.image.includes('PASTE') ? (
                <div className="w-full h-36 overflow-hidden">
                  <img
                    src={season.hostCharacter.image}
                    alt={season.hostCharacter.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <div
                  className="w-full h-36 flex items-center justify-center text-5xl"
                  style={{ background: 'var(--color-bg-secondary)' }}
                >
                  {season.hostCharacter.emoji || '🎴'}
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={13} style={{ color: 'var(--color-accent-primary)' }} />
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    Host
                  </span>
                </div>
                <p
                  className="font-bold text-sm mb-0.5"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {season.hostCharacter.name}
                </p>
                <p
                  className="text-xs mb-2"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  {season.hostCharacter.anime}
                </p>
                <div className="flex gap-1.5">
                  <Quote size={11} style={{ color: 'var(--color-accent-secondary)', flexShrink: 0, marginTop: 2 }} />
                  <p
                    className="text-xs italic leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {season.hostCharacter.quote}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
          </div>
        );
      })()}

      {/* Episode grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {season.episodes.map((ep) => (
          <motion.div key={ep.id} variants={cardVariants}>
            <EpisodeCard
              episode={ep}
              allEpisodes={season.episodes}
              season={season}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
