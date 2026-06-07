// ============================================================
// src/components/home/SeasonRow.jsx
// Horizontal scrollable row for one season.
// Shows host character quote, episode cards, "View all" link.
// ============================================================

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';
import EpisodeCard from './EpisodeCard';

export default function SeasonRow({ season }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = dir === 'left' ? -320 : 320;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="mb-14"
    >
      {/* Row header */}
      <div className="flex items-end justify-between mb-4 px-1">
        <div className="space-y-0.5">
          {/* Season label */}
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            Season {season.number === 0 ? '0' : season.number}
          </p>
          {/* Season title */}
          <h2
            className="text-xl font-extrabold leading-tight"
            style={{ color: 'var(--color-accent-deep)' }}
          >
            {season.title}
          </h2>
          {/* Period */}
          <p
            className="text-xs"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {season.period}
          </p>
          {/* Host character quote */}
          {season.hostCharacter && (
            <p
              className="text-sm italic mt-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              "{season.hostCharacter.quote}"
              <span
                className="not-italic font-medium ml-2"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                — {season.hostCharacter.name}
              </span>
            </p>
          )}
        </div>

        {/* View all + scroll buttons */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          {/* Scroll arrows — hidden on mobile (touch scroll works) */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border transition-colors hover:border-accent-secondary"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border transition-colors hover:border-accent-secondary"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>

          <Link
            to={`/season/${season.id}`}
            className="flex items-center gap-1 text-sm font-semibold transition-colors hover:underline"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            View all
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1"
        style={{
          scrollbarWidth: 'none',        // Firefox
          msOverflowStyle: 'none',       // IE
        }}
      >
        {season.episodes.map((ep) => (
          <div key={ep.id} className="flex-shrink-0 w-[220px] sm:w-[240px]">
            <EpisodeCard
              episode={ep}
              allEpisodes={season.episodes}
              season={season}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
