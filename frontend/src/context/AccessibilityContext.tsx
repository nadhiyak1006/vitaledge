import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  largeFonts: boolean;
  toggleLargeFonts: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeFonts, setLargeFonts] = useState(false);

  useEffect(() => {
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedLargeFonts = localStorage.getItem('largeFonts') === 'true';
    
    setHighContrast(savedHighContrast);
    setLargeFonts(savedLargeFonts);
  }, []);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    if (largeFonts) {
      document.documentElement.classList.add('large-fonts');
    } else {
      document.documentElement.classList.remove('large-fonts');
    }
  }, [largeFonts]);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('highContrast', String(newValue));
  };

  const toggleLargeFonts = () => {
    const newValue = !largeFonts;
    setLargeFonts(newValue);
    localStorage.setItem('largeFonts', String(newValue));
  };

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      toggleHighContrast,
      largeFonts,
      toggleLargeFonts,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
