// ============================================================
// src/components/ui/Badge.jsx
// Small pill badge for episode metadata (type label, etc.)
// ============================================================

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-accent-primary/15 text-accent-deep border border-accent-secondary/40',
    moment:  'bg-purple-100 text-purple-700 border border-purple-200',
    video:   'bg-red-100 text-red-700 border border-red-200',
    gallery: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    clips:   'bg-orange-100 text-orange-700 border border-orange-200',
    mixed:   'bg-blue-100 text-blue-700 border border-blue-200',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide
        ${variants[variant] ?? variants.default}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
