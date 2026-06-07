import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/data';

function PawDivider() {
  return (
    <div className="flex items-center gap-3 my-4" aria-hidden="true">
      <div className="flex-1 h-px bg-border-color" />
      <div className="flex items-center gap-2 text-text-tertiary">
        <PawSmall />
        <PawSmall className="opacity-60 scale-75" />
        <PawSmall className="opacity-40 scale-50" />
      </div>
      <div className="flex-1 h-px bg-border-color" />
    </div>
  );
}

function PawSmall({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={`w-4 h-4 fill-current ${className}`} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="65" rx="22" ry="18" />
      <ellipse cx="25" cy="42" rx="10" ry="12" transform="rotate(-15 25 42)" />
      <ellipse cx="40" cy="33" rx="10" ry="12" transform="rotate(-5 40 33)" />
      <ellipse cx="60" cy="33" rx="10" ry="12" transform="rotate(5 60 33)" />
      <ellipse cx="75" cy="42" rx="10" ry="12" transform="rotate(15 75 42)" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border-color mt-16">
      <div className="shamflix-container py-8">
        <PawDivider />

        <div className="text-center space-y-3">
          <p className="text-text-secondary text-sm">
            Made with <span className="text-classified" aria-label="love">♥</span> by{' '}
            <span className="font-semibold text-accent-deep">{siteConfig.createdBy}</span> for{' '}
            <span className="font-semibold text-accent-deep">{siteConfig.dedicatedTo}</span>
          </p>

          <p className="text-text-tertiary text-xs font-medium tracking-wide">
            {siteConfig.name} · {currentYear}
          </p>

          <p className="text-text-tertiary text-xs italic">
            "{siteConfig.tagline}"
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              to="/timeline"
              className="text-text-tertiary text-xs hover:text-accent-primary transition-colors duration-200"
            >
              Timeline
            </Link>
            <span className="text-border-color" aria-hidden="true">·</span>
            <Link
              to="/extras/know-me"
              className="text-text-tertiary text-xs hover:text-accent-primary transition-colors duration-200"
            >
              Know Me
            </Link>
          </div>

          <p className="text-text-tertiary text-[10px] pt-2 opacity-50">
            No backend was harmed in the making of this website
          </p>
        </div>
      </div>
    </footer>
  );
}
