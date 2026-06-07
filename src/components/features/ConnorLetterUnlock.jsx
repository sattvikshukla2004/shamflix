// ============================================================
// src/components/features/ConnorLetterUnlock.jsx
// Subtle "access memory file" button — links to /letter.
// Designed to be dropped anywhere; very low-opacity until hovered.
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function ConnorLetterUnlock({ className = '' }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/letter')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: hovered ? 0.75 : 0.3 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-1.5 text-xs tracking-widest uppercase focus-visible:outline-none ${className}`}
      style={{ color: 'var(--color-text-tertiary)', cursor: hovered ? 'pointer' : 'default' }}
      aria-label="Access memory file — a hidden letter"
      title="access memory file"
    >
      <Lock size={10} />
      access memory file
    </motion.button>
  );
}
