// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { createContext, useState } from 'react';

// Context
import { ProfileProvider, useProfile } from './context/ProfileContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Global features
import CatMascot from './components/features/CatMascot';
import BirthdayCake from './components/features/BirthdayCake';
import DoNotTouch from './components/features/DoNotTouch';
import AmbientSparkles from './components/features/AmbientSparkles';
import CherryBlossoms from './components/features/CherryBlossoms';
import ProfileSelect from './components/features/ProfileSelect';

// Pages
import Home from './pages/Home';
import SeasonPage from './pages/SeasonPage';
import Timeline from './pages/Timeline';
import KnowMeQuiz from './pages/KnowMeQuiz';
import MemoryJarPage from './pages/MemoryJarPage';
import ConnorLetter from './pages/ConnorLetter';
import SecretCat from './pages/SecretCat';
import NotFound from './pages/NotFound';

export const LogoClickContext = createContext({ count: 0, increment: () => {} });

// Inner app � reads profile from context
function AppInner() {
  const { profile } = useProfile();
  const [logoClickCount, setLogoClickCount] = useState(0);
  const incrementLogoClick = () => setLogoClickCount(prev => prev + 1);

  // No profile selected ? show the profile picker
  if (!profile) {
    return (
      <AnimatePresence>
        <ProfileSelect key="profile-select" />
      </AnimatePresence>
    );
  }

  const themeClass = profile === 'riya' ? 'theme-riya' : 'theme-sattvik';

  return (
    <LogoClickContext.Provider value={{ count: logoClickCount, increment: incrementLogoClick }}>
      <BrowserRouter>
        <div className={`min-h-screen flex flex-col bg-bg-primary relative ${themeClass}`}>
          {/* Cherry blossoms � Sattvik only */}
          {profile === 'sattvik' && <CherryBlossoms />}
          <AmbientSparkles />
          <Navbar />
          <main className="flex-1 pt-16 relative z-10">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/season/:seasonId" element={<SeasonPage />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/extras/know-me" element={<KnowMeQuiz />} />
                <Route path="/extras/memory-jar" element={<MemoryJarPage />} />
                <Route path="/letter" element={<ConnorLetter />} />
                <Route path="/secret-cats" element={<SecretCat />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <CatMascot />
          <BirthdayCake />
          <DoNotTouch />
        </div>
      </BrowserRouter>
    </LogoClickContext.Provider>
  );
}

function App() {
  return (
    <ProfileProvider>
      <AppInner />
    </ProfileProvider>
  );
}

export default App;
