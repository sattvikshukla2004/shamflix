// ============================================================
// src/components/ui/ClassifiedStamp.jsx
// Red CLASSIFIED stamp overlay for blurred episodes.
// ============================================================

export default function ClassifiedStamp({ size = 'md' }) {
  const sizes = {
    sm: 'text-xs px-2 py-0.5 border',
    md: 'text-sm px-3 py-1 border-2',
    lg: 'text-base px-4 py-1.5 border-2',
  };

  return (
    <span
      className={`
        inline-block font-black tracking-widest uppercase text-classified
        border-classified rounded rotate-[-8deg] select-none
        ${sizes[size] ?? sizes.md}
      `}
      style={{ color: 'var(--color-classified)', borderColor: 'var(--color-classified)' }}
      aria-label="Classified"
    >
      Classified
    </span>
  );
}
