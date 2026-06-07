// ============================================================
// src/context/ProfileContext.jsx
// Manages which profile is active: 'sattvik' | 'riya' | null
// null = show the profile selector screen
// Persisted to localStorage so repeat visits skip the picker.
// ============================================================

import { createContext, useContext, useState } from 'react';

export const ProfileContext = createContext({
  profile: null,
  setProfile: () => {},
  clearProfile: () => {},
});

export function ProfileProvider({ children }) {
  // Profile is NOT persisted — Mental Asylum screen always shows on load
  const [profile, setProfileState] = useState(null);

  const setProfile = (p) => {
    setProfileState(p);
  };

  const clearProfile = () => {
    setProfileState(null);
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
