// src/pages/Glossary.jsx — SHIFT 4 COMPLETE
import { useState } from 'react';
import { motion } from 'framer-motion';
import { insideJokes } from '../data/data.js';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function Glossary() {
  const [search, setSearch] = useState('');

  const filtered = insideJokes.filter(j =>
    j.term.toLowerCase().includes(search.toLowerCase()) ||
    j.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-bg-primary pb-24"
    >
      {/* Wikipedia-style header */}
      <div className="bg-[#F0F8FF] border-b-2 border-[#C8E3F5]">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs text-[#8AAEC4] uppercase tracking-widest mb-1"
          >
            Shamflix Lore Compendium · Est. 2023
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl font-bold text-[#1A2E3B] mb-1"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Glossary of Incidents
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-[#4A6B82] text-sm mt-2 max-w-2xl"
          >
            A comprehensive encyclopaedia of shared terminology, classified incidents, and notable events
            in the documented history of Sattvik and Sham. Entries are verified by at least one (1) witness.
            Some entries remain disputed. Several remain classified. This is not a legal document.
          </motion.p>

          {/* Search box */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-5"
          >
            <input
              type="text"
              placeholder="Search the lore..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-sm px-4 py-2 rounded-lg border border-[#C8E3F5] bg-white text-[#1A2E3B] text-sm outline-none focus:border-[#5AADE2] transition-colors"
            />
          </motion.div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 pt-8">

        {/* Article meta bar (Wikipedia style) */}
        <div className="flex flex-wrap gap-4 text-xs text-[#8AAEC4] border-b border-[#C8E3F5] pb-4 mb-8">
          <span>📋 {insideJokes.length} entries</span>
          <span>📅 Last updated: Ongoing</span>
          <span>🔒 Some content classified</span>
          <span>⚠️ Accuracy: mostly</span>
        </div>

        {/* Table of contents */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="float-none md:float-right md:ml-8 md:mb-4 mb-8 bg-[#F0F8FF] border border-[#C8E3F5] rounded-xl p-5 md:w-64 w-full"
        >
          <p className="text-xs font-bold text-[#2E86C1] uppercase tracking-widest mb-3">Contents</p>
          <ol className="list-decimal list-inside space-y-1">
            {insideJokes.map((j, i) => (
              <li key={i} className="text-xs text-[#4A6B82]">
                <a
                  href={`#entry-${i}`}
                  className="hover:text-[#5AADE2] transition-colors"
                >
                  {j.term}
                </a>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Entries */}
        {filtered.length === 0 ? (
          <p className="text-[#8AAEC4] text-sm py-8">No entries match "{search}". The archives have been checked.</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-0"
          >
            {filtered.map((joke, i) => (
              <motion.div
                key={i}
                id={`entry-${insideJokes.indexOf(joke)}`}
                variants={itemVariants}
                className="border-b border-[#E1F0FB] py-7 first:pt-0"
              >
                {/* Term heading */}
                <h2
                  className="text-2xl font-bold text-[#1A2E3B] mb-1"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {joke.term}
                </h2>

                {/* Wikipedia-style metadata line */}
                <div className="flex flex-wrap gap-3 text-xs text-[#8AAEC4] mb-3">
                  {joke.firstAppearance && (
                    <span>
                      <span className="text-[#5AADE2] font-semibold">First appearance:</span> {joke.firstAppearance}
                    </span>
                  )}
                  {joke.seeAlso && (
                    <span>
                      <span className="text-[#5AADE2] font-semibold">See also:</span>{' '}
                      <span className="italic">{joke.seeAlso}</span>
                    </span>
                  )}
                </div>

                {/* Definition */}
                <p className="text-[#1A2E3B] leading-relaxed text-[15px]">
                  {joke.definition}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 pt-6 border-t border-[#C8E3F5] text-xs text-[#8AAEC4] text-center"
        >
          <p>
            This glossary is a living document. Entries may be added at any time.
            The creators accept no liability for incidents described herein. Shamflix © {new Date().getFullYear()}.
          </p>
          <p className="mt-1 italic">Some entries remain sealed. They know who they are.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
