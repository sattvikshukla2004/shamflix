import { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Clock, Star, Sparkles, UserCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoClickContext } from '../../App';
import { siteConfig } from '../../data/data';
import { useProfile } from '../../context/ProfileContext';

function PawIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="50" cy="65" rx="22" ry="18" />
      <ellipse cx="25" cy="42" rx="10" ry="12" transform="rotate(-15 25 42)" />
      <ellipse cx="40" cy="33" rx="10" ry="12" transform="rotate(-5 40 33)" />
      <ellipse cx="60" cy="33" rx="10" ry="12" transform="rotate(5 60 33)" />
      <ellipse cx="75" cy="42" rx="10" ry="12" transform="rotate(15 75 42)" />
    </svg>
  );
}

const LOGO_NAMES = [
  'Shamflix',
  'Shamchan',
  'Twin',
  'Ms-Spellbee',
  'Bulbul',
  'Gaymer-Girl',
  'Tsundere-San',
  'lil-nigga',
];

const SECRET_INDEX = 7;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);
  const [nameIdx, setNameIdx] = useState(0);
  const { count, increment } = useContext(LogoClickContext);
  const { profile, clearProfile } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setExtrasOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setExtrasOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLogoClick = () => {
    setClickEffect(true);
    setTimeout(() => setClickEffect(false), 300);

    const nextIdx = (nameIdx + 1) % LOGO_NAMES.length;
    setNameIdx(nextIdx);

    if (nextIdx === SECRET_INDEX) {
      navigate('/secret-cats');
    }

    increment();
  };

  const isExtrasActive = location.pathname.startsWith('/extras');
  const knowMeLabel = profile === 'riya'
    ? 'How Well Do You Know Riya?'
    : 'How Well Do You Know Sattvik?';

  const navLinks = [
    { to: '/', label: 'Home', icon: null, exact: true },
    { to: '/timeline', label: 'Timeline', icon: Clock },
    {
      label: 'Extras',
      icon: Star,
      dropdown: [
        { to: '/extras/know-me', label: knowMeLabel, icon: Star },
        { to: '/extras/memory-jar', label: 'Memory Jar', icon: Sparkles },
      ],
    },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border-color shadow-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="shamflix-container">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2 group select-none focus-visible:outline-accent-primary"
              aria-label="Shamflix home"
              style={{ cursor: 'url(/cat-cursor-pointer.png), pointer' }}
            >
              <motion.div
                animate={clickEffect ? { scale: [1, 1.35, 1], rotate: [0, -12, 12, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                <PawIcon className="w-7 h-7 text-accent-primary group-hover:text-accent-deep transition-colors duration-200" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={nameIdx}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="text-lg font-bold tracking-tight"
                  style={{ color: 'var(--color-accent-deep)', minWidth: '6rem', display: 'inline-block' }}
                >
                  {LOGO_NAMES[nameIdx]}
                </motion.span>
              </AnimatePresence>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key="extras" className="relative">
                      <button
                        onClick={() => setExtrasOpen(!extrasOpen)}
                        onBlur={(e) => {
                          if (!e.currentTarget.parentElement.contains(e.relatedTarget)) {
                            setTimeout(() => setExtrasOpen(false), 150);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isExtrasActive
                            ? 'bg-accent-primary/10 text-accent-deep'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                        }`}
                        aria-haspopup="true"
                        aria-expanded={extrasOpen}
                      >
                        {link.icon && <link.icon className="w-4 h-4" />}
                        {link.label}
                        <svg
                          className={`w-3 h-3 transition-transform duration-200 ${extrasOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {extrasOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-border-color overflow-hidden"
                          >
                            {link.dropdown.map((item) => (
                              <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                  `block px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                                    isActive
                                      ? 'bg-accent-primary/10 text-accent-deep'
                                      : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                                  }`
                                }
                              >
                                {item.label}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-accent-primary/10 text-accent-deep'
                          : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                      }`
                    }
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </NavLink>
                );
              })}

              <div className="ml-3 px-3 py-1 bg-bg-secondary rounded-full border border-border-color">
                <span className="text-xs text-text-tertiary font-medium italic">
                  {siteConfig.tagline}
                </span>
              </div>

              <button
                id="profile-switcher-btn"
                onClick={() => {
                  setMobileOpen(false);
                  clearProfile();
                }}
                title="Switch profile"
                className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'var(--color-bg-secondary)',
                  color: 'var(--color-accent-deep)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  {profile === 'riya' ? 'Riya' : 'Sattvik'}
                </span>
                <UserCircle2 size={12} style={{ opacity: 0.6 }} />
              </button>
            </div>

            <button
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-16 right-0 bottom-0 z-50 w-72 bg-white border-l border-border-color shadow-xl md:hidden overflow-y-auto"
            >
              <div className="p-4 space-y-1">
                <div className="px-3 py-2 mb-4">
                  <p className="text-xs text-text-tertiary italic">{siteConfig.tagline}</p>
                </div>

                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-accent-primary/10 text-accent-deep' : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                    }`
                  }
                >
                  <PawIcon className="w-5 h-5" />
                  Home
                </NavLink>

                <NavLink
                  to="/timeline"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-accent-primary/10 text-accent-deep' : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                    }`
                  }
                >
                  <Clock className="w-5 h-5" />
                  Timeline
                </NavLink>

                <div className="pt-2">
                  <p className="px-3 py-1 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                    Extras
                  </p>
                  <NavLink
                    to="/extras/know-me"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'bg-accent-primary/10 text-accent-deep' : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                      }`
                    }
                  >
                    <Star className="w-5 h-5" />
                    {knowMeLabel}
                  </NavLink>
                  <NavLink
                    to="/extras/memory-jar"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'bg-accent-primary/10 text-accent-deep' : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                      }`
                    }
                  >
                    <Sparkles className="w-5 h-5" />
                    Memory Jar
                  </NavLink>
                </div>

                {count > 0 && count < 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-accent-primary/5 rounded-xl border border-accent-secondary/30"
                  >
                    <p className="text-xs text-text-tertiary italic">
                      {5 - count} more logo click{5 - count !== 1 ? 's' : ''}...
                    </p>
                  </motion.div>
                )}

                <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <button
                    id="profile-switcher-mobile-btn"
                    onClick={() => {
                      setMobileOpen(false);
                      clearProfile();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{ color: 'var(--color-accent-deep)', background: 'var(--color-bg-secondary)' }}
                  >
                    <UserCircle2 className="w-5 h-5" />
                    Switch profile ({profile === 'riya' ? 'Riya' : 'Sattvik'})
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
