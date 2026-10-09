'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

export type ColorMode = 'light' | 'dark';

export type ColorModeContextType = {
  colorMode: ColorMode;
  setColorMode: (value: ColorMode) => void;
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextType | null>(null);

export type ColorModeProviderProps = {
  children: React.ReactNode;
};

const isColorMode = (value: unknown): value is ColorMode =>
  value === 'light' || value === 'dark';

const readStoredTheme = (): ColorMode | null => {
  try {
    const stored = localStorage.getItem('theme');
    return isColorMode(stored) ? stored : null;
  } catch {
    return null;
  }
};

export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
  const [colorMode, setColorModeState] = useState<ColorMode>('light');

  // Only an explicit user choice is persisted. Persisting the resolved value
  // would freeze the system default into localStorage and later override it.
  const setColorMode = (value: ColorMode) => {
    setColorModeState(value);
    try {
      localStorage.setItem('theme', value);
    } catch {
      // storage unavailable (e.g. private mode); choice applies to this session
    }
  };

  const toggleColorMode = () =>
    setColorMode(colorMode === 'light' ? 'dark' : 'light');

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = (): ColorMode => {
      return media.matches ? 'dark' : 'light';
    };

    const urlTheme = new URLSearchParams(window.location.search).get(
      'docusaurus-theme'
    );
    // URL param wins for this view only (not persisted)
    setColorModeState(
      isColorMode(urlTheme) ? urlTheme : (readStoredTheme() ?? systemTheme())
    );

    // Follow live system changes unless the user chose explicitly
    const onChange = () => {
      if (!readStoredTheme()) {
        setColorModeState(systemTheme());
      }
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', colorMode);
  }, [colorMode]);

  return (
    <ColorModeContext.Provider
      value={{
        colorMode,
        setColorMode,
        toggleColorMode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = (): ColorModeContextType => {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error('useColorMode must be used inside a ColorModeProvider');
  }

  return context;
};
