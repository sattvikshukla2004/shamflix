// ============================================================
// src/hooks/useBirthday.js
// Checks if today is Sham's birthday AND if the splash
// hasn't been shown this session yet.
// ============================================================

import { useState, useEffect } from 'react';
import { siteConfig } from '../data/data';

const SPLASH_KEY = 'shamflix_splash_shown';

export function useBirthday() {
  const [isBirthday, setIsBirthday] = useState(false);
  const [splashShown, setSplashShown] = useState(false);

  useEffect(() => {
    // Check if today matches the birthday date (MM-DD format)
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayMMDD = `${month}-${day}`;

    const birthdayMatch = todayMMDD === siteConfig.birthdayDate;
    
    // Check sessionStorage — only show once per session
    const alreadyShown = sessionStorage.getItem(SPLASH_KEY) === 'true';

    setIsBirthday(birthdayMatch);
    setSplashShown(alreadyShown);
  }, []);

  const markSplashShown = () => {
    sessionStorage.setItem(SPLASH_KEY, 'true');
    setSplashShown(true);
  };

  // Should show splash: birthday AND not already shown this session
  const shouldShowSplash = isBirthday && !splashShown;

  return { isBirthday, shouldShowSplash, markSplashShown };
}

export default useBirthday;
