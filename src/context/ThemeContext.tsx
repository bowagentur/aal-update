import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { hotels } from '../data/hotels';

interface ThemeContextType {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  setTheme: (theme: { primary: string; secondary: string }) => void;
}

const defaultTheme = {
  primaryColor: '#0069b3',
  secondaryColor: '#c4984d',
  logo: '/images/logo.png',
  setTheme: () => {}
};

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initial state mit URL-Check
  const initialState = (() => {
    const pathSegments = window.location.pathname.split('/');
    const urlHotelId = pathSegments[2]; // /hotels/:hotelId
    
    if (urlHotelId) {
      const hotel = hotels.find(h => h.id === urlHotelId);
      if (hotel?.branding) {
        const primaryColor = ensureValidHexColor(hotel.branding.primaryColor, defaultTheme.primaryColor);
        const secondaryColor = ensureValidHexColor(hotel.branding.secondaryColor, defaultTheme.secondaryColor);
        
        // Setze CSS Variablen direkt beim initialen Laden
        updateCSSVariables(primaryColor, secondaryColor);
        
        return {
          primaryColor,
          secondaryColor,
          logo: hotel.branding.logo || defaultTheme.logo
        };
      }
    }
    return defaultTheme;
  })();

  const [theme, setThemeState] = useState<Omit<ThemeContextType, 'setTheme'>>(initialState);
  const { hotelId } = useParams();
  
  // Theme-Updates bei Navigation
  useEffect(() => {
    if (hotelId) {
      const hotel = hotels.find(h => h.id === hotelId);
      if (hotel?.branding) {
        const primaryColor = ensureValidHexColor(hotel.branding.primaryColor, defaultTheme.primaryColor);
        const secondaryColor = ensureValidHexColor(hotel.branding.secondaryColor, defaultTheme.secondaryColor);
        
        updateCSSVariables(primaryColor, secondaryColor);
        setThemeState({
          primaryColor,
          secondaryColor,
          logo: hotel.branding.logo || defaultTheme.logo
        });
      }
    } else {
      updateCSSVariables(defaultTheme.primaryColor, defaultTheme.secondaryColor);
      setThemeState(defaultTheme);
    }
  }, [hotelId]);

  const setTheme = useCallback((newTheme: { primary: string; secondary: string }) => {
    if (!newTheme?.primary || !newTheme?.secondary) return;
    
    const primaryColor = ensureValidHexColor(newTheme.primary, defaultTheme.primaryColor);
    const secondaryColor = ensureValidHexColor(newTheme.secondary, defaultTheme.secondaryColor);
    
    updateCSSVariables(primaryColor, secondaryColor);
    setThemeState(prev => ({
      ...prev,
      primaryColor,
      secondaryColor
    }));
  }, []);

  const contextValue = useMemo(() => ({
    ...theme,
    setTheme
  }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Helper functions
function ensureValidHexColor(color: string | undefined, fallback: string): string {
  if (!color) return fallback;
  const hexColor = color.startsWith('#') ? color : `#${color}`;
  return /^#[0-9A-F]{6}$/i.test(hexColor) ? hexColor : fallback;
}

function updateCSSVariables(primary: string | undefined, secondary: string | undefined) {
  const validPrimary = ensureValidHexColor(primary, defaultTheme.primaryColor);
  const validSecondary = ensureValidHexColor(secondary, defaultTheme.secondaryColor);
  
  document.documentElement.style.setProperty('--color-primary', validPrimary);
  document.documentElement.style.setProperty('--color-secondary', validSecondary);
  document.documentElement.style.setProperty('--color-primary-dark', adjustColor(validPrimary, -20));
}

function adjustColor(color: string, amount: number): string {
  if (!color) return defaultTheme.primaryColor;
  
  try {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;

    r = Math.min(Math.max(0, r), 255);
    g = Math.min(Math.max(0, g), 255);
    b = Math.min(Math.max(0, b), 255);

    return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
  } catch (error) {
    return defaultTheme.primaryColor;
  }
}

export const useTheme = () => useContext(ThemeContext); 