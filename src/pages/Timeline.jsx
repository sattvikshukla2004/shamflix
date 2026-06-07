// src/pages/Timeline.jsx — SHIFT 4 COMPLETE
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { seasons } from '../data/data.js';
import EpisodeModal from '../components/episode/EpisodeModal.jsx';

// Flatten all episodes from all seasons for timeline
function buildTimelineItems() {
  const items = [];
  seasons.forEach(season => {
    season.episodes.forEach(ep => {
      items.push({ ...ep, seasonId: season.id, seasonNumber: season.number, seasonTitle: season.title, seasonAccent: season.accentColor });
    });
  });
  return items;
}

const SEASON_COLORS = {
  'season-0': { bg: '#E1F0FB', accent: '#5AADE2', dot: '#5AADE2', label: 'S0' },
  'season-1': { bg: '#D6EEFA', accent: '#7BC8F6', dot: '#7BC8F6', label: 'S1' },
  'season-2': { bg: '#C8E3F5', accent: '#2E86C1', dot: '#2E86C1', label: 'S2' },
  'season-3': { bg: '#B8D9F0', accent: '#1A6B9A', dot: '#1A6B9A', label: 'S3' },
  'season-4': { bg: '#D4E8F7', accent: '#4A90D9', dot: '#4A90D9', label: 'S4' },
};
const DEFAULT_COLOR = { bg: '#E1F0FB', accent: '#5AADE2', dot: '#5AADE2', label: '??' };

export default function Timeline() {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [selectedSeasonEpisodes, setSelectedSeasonEpisodes] = useState([]);
  const timelineItems = buildTimelineItems();

  const openEpisode = (ep) => {
    const season = seasons.find(s => s.id === ep.seasonId);
    setSelectedSeasonEpisodes(season.episodes);
    setSelectedEpisode(ep);
  };

  const handlePrevNext = (episode) => {
    const season = seasons.find(s => s.id === episode.seasonId);
    setSelectedSeasonEpisodes(season ? season.episodes : []);
    setSelectedEpisode(episode);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-bg-primary pb-24"
    >
      {/* Header */}
      <div className="bg-bg-secondary border-b border-[#C8E3F5] py-12 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-semibold tracking-[0.25em] uppercase text-[#5AADE2] mb-2"
        >
          SHAMFLIX ARCHIVES
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-[#1A2E3B] mb-3"
        >
          The Full Timeline
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-[#4A6B82] text-lg max-w-xl mx-auto"
        >
          Every episode. Chronological order. Click any node to open.
        </motion.p>
      </div>

      {/* Season legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 px-4 pt-8 pb-2"
      >
        {seasons.map(s => {
          const c = SEASON_COLORS[s.id] ?? DEFAULT_COLOR;
          return (
            <div key={s.id} className="flex items-center gap-2 text-xs text-[#4A6B82]">
              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: c.dot }} />
              <span>S{s.number}: {s.title}</span>
            </div>
          );
        })}
      </motion.div>

      {/* ── DESKTOP: Horizontal scroll timeline ── */}
      <div className="hidden md:block overflow-x-auto pb-6 pt-10 px-12">
        <div className="relative flex items-start" style={{ minWidth: `${timelineItems.length * 180}px`, paddingBottom: '80px' }}>
          {/* Horizontal line */}
          <div className="absolute left-0 right-0 top-[40px] h-[3px] bg-[#C8E3F5] z-0" />

          {timelineItems.map((ep, i) => {
            const colors = SEASON_COLORS[ep.seasonId] ?? DEFAULT_COLOR;
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={ep.id}
                initial={{ opacity: 0, y: isEven ? -20 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.35 }}
                className="relative flex flex-col items-center"
                style={{ width: '180px', flexShrink: 0 }}
              >
                {/* Card above the line (even) */}
                {isEven && (
                  <button
                    onClick={() => openEpisode(ep)}
                    className="w-36 mb-2 rounded-xl p-3 text-left shadow-sm border border-[#C8E3F5] bg-white hover:shadow-md hover:border-[#5AADE2] transition-all duration-200 group"
                    style={{ marginBottom: '8px' }}
                  >
                    <div className="text-[10px] font-bold tracking-widest mb-1" style={{ color: colors.dot }}>{colors.label} · E{ep.number}</div>
                    <div className="text-xs font-semibold text-[#1A2E3B] leading-tight group-hover:text-[#2E86C1] transition-colors line-clamp-2">{ep.title}</div>
                    <div className="text-[10px] text-[#8AAEC4] mt-1">{ep.date}</div>
                  </button>
                )}

                {/* Dot */}
                <div className="relative z-10 mt-auto" style={{ marginTop: isEven ? 0 : '64px' }}>
                  <div
                    className="w-5 h-5 rounded-full border-4 border-white shadow cursor-pointer hover:scale-125 transition-transform"
                    style={{ backgroundColor: colors.dot }}
                    onClick={() => openEpisode(ep)}
                  />
                </div>

                {/* Card below the line (odd) */}
                {!isEven && (
                  <button
                    onClick={() => openEpisode(ep)}
                    className="w-36 mt-2 rounded-xl p-3 text-left shadow-sm border border-[#C8E3F5] bg-white hover:shadow-md hover:border-[#5AADE2] transition-all duration-200 group"
                  >
                    <div className="text-[10px] font-bold tracking-widest mb-1" style={{ color: colors.dot }}>{colors.label} · E{ep.number}</div>
                    <div className="text-xs font-semibold text-[#1A2E3B] leading-tight group-hover:text-[#2E86C1] transition-colors line-clamp-2">{ep.title}</div>
                    <div className="text-[10px] text-[#8AAEC4] mt-1">{ep.date}</div>
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE: Vertical timeline ── */}
      <div className="md:hidden px-4 pt-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-[3px] bg-[#C8E3F5]" />

          <div className="flex flex-col gap-5">
            {timelineItems.map((ep, i) => {
              const colors = SEASON_COLORS[ep.seasonId] ?? DEFAULT_COLOR;
              return (
                <motion.div
                  key={ep.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.3 }}
                  className="flex items-start gap-4"
                >
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 mt-3">
                    <div
                      className="w-[22px] h-[22px] rounded-full border-4 border-white shadow cursor-pointer"
                      style={{ backgroundColor: colors.dot }}
                      onClick={() => openEpisode(ep)}
                    />
                  </div>

                  {/* Card */}
                  <button
                    onClick={() => openEpisode(ep)}
                    className="flex-1 text-left rounded-xl p-4 bg-white border border-[#C8E3F5] shadow-sm hover:shadow-md hover:border-[#5AADE2] transition-all duration-200 group"
                  >
                    <div className="text-[10px] font-bold tracking-widest mb-1" style={{ color: colors.dot }}>{colors.label} · Ep {ep.number} · {ep.date}</div>
                    <div className="text-sm font-semibold text-[#1A2E3B] group-hover:text-[#2E86C1] transition-colors">{ep.title}</div>
                    <div className="text-xs text-[#8AAEC4] mt-1 line-clamp-2">{ep.description}</div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Episode modal */}
      <AnimatePresence>
        {selectedEpisode && (
          <EpisodeModal
            episode={selectedEpisode}
            episodes={selectedSeasonEpisodes}
            onClose={() => setSelectedEpisode(null)}
            onNavigate={handlePrevNext}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
