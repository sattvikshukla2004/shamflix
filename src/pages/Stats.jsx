// src/pages/Stats.jsx — SHIFT 4 COMPLETE
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Cake, Smartphone, Glasses, Tv, ShieldOff,
  Footprints, Bike, Heart, Zap, CheckCircle, Award,
  Lock
} from 'lucide-react';
import { friendshipStats } from '../data/data.js';

// Map lucide icon name strings → components
const ICON_MAP = {
  'map-pin': MapPin,
  'cake': Cake,
  'smartphone': Smartphone,
  'glasses': Glasses,
  'tv': Tv,
  'shield-off': ShieldOff,
  'footprints': Footprints,
  'bike': Bike,
  'heart': Heart,
  'zap': Zap,
  'check-circle': CheckCircle,
  'award': Award,
};

// Accent colors for the Spotify-Wrapped style cards (cycling)
const CARD_ACCENTS = [
  { bg: '#5AADE2', text: '#fff', iconBg: 'rgba(255,255,255,0.25)' },
  { bg: '#2E86C1', text: '#fff', iconBg: 'rgba(255,255,255,0.2)' },
  { bg: '#7BC8F6', text: '#1A2E3B', iconBg: 'rgba(255,255,255,0.4)' },
  { bg: '#E1F0FB', text: '#2E86C1', iconBg: 'rgba(94,173,226,0.2)' },
  { bg: '#F4C430', text: '#1A2E3B', iconBg: 'rgba(255,255,255,0.3)' },
  { bg: '#0D9488', text: '#fff', iconBg: 'rgba(255,255,255,0.2)' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function Stats() {
  const [hoveredSecret, setHoveredSecret] = useState(false);
  const navigate = useNavigate();

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
          SHAMFLIX WRAPPED
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-[#1A2E3B] mb-3"
        >
          3 Years. By the numbers.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-[#4A6B82] text-lg max-w-xl mx-auto"
        >
          Official data compiled from classified archives. Accuracy: mostly. Bias: entirely.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="max-w-6xl mx-auto px-4 pt-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {friendshipStats.map((stat, i) => {
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
            const IconComponent = ICON_MAP[stat.icon] || Heart;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{ backgroundColor: accent.bg }}
                className="rounded-2xl p-7 shadow-md relative overflow-hidden cursor-default"
              >
                {/* Decorative circle */}
                <div
                  className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-30"
                  style={{ backgroundColor: accent.iconBg === 'rgba(255,255,255,0.25)' ? '#fff' : accent.bg }}
                />
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10"
                  style={{ backgroundColor: accent.iconBg }}
                >
                  <IconComponent
                    size={24}
                    style={{ color: accent.text }}
                    strokeWidth={2}
                  />
                </div>
                {/* Value */}
                <div
                  className="text-4xl font-black mb-1 relative z-10 leading-none"
                  style={{ color: accent.text }}
                >
                  {stat.value}
                </div>
                {/* Label */}
                <div
                  className="text-sm font-medium relative z-10 mt-2 opacity-80"
                  style={{ color: accent.text }}
                >
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-[#8AAEC4] text-sm mt-14 mb-4"
        >
          Data compiled from memory, vibes, and classified sources. Margin of error: ±Riya.
        </motion.p>

        {/* Hidden /letter link — subtle, at very bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={() => navigate('/letter')}
            onMouseEnter={() => setHoveredSecret(true)}
            onMouseLeave={() => setHoveredSecret(false)}
            className="flex items-center gap-1.5 text-[#C8E3F5] hover:text-[#8AAEC4] transition-colors duration-300 text-xs tracking-widest uppercase"
            style={{ opacity: hoveredSecret ? 0.8 : 0.35 }}
          >
            <Lock size={10} />
            access memory file
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
