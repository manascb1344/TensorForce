import { useState, useEffect } from 'react';
import { Theme } from '../../core/domain/Theme.js';
import { ThemeStorageService } from '../../infrastructure/storage/ThemeStorageService.js';
import { THEME_CONFIG } from '../../shared/constants/appConstants.js';
import { isValidThemeMode, isValidHexColor } from '../../shared/utils/validation.js';

/**
 * Custom hook for theme management
 * Handles theme state and persistence
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(new Theme());
  const [isLoading, setIsLoading] = useState(true);
  
  const storageService = new ThemeStorageService();

  useEffect(() => {
    // Load theme from storage on mount
    const loadTheme = () => {
      try {
        const storedTheme = storageService.loadTheme();
        setTheme(storedTheme);
      } catch (error) {
        console.warn('Failed to load theme:', error);
        setTheme(new Theme());
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  const updateTheme = (newThemeData) => {
    try {
      const updatedTheme = new Theme({
        ...theme,
        ...newThemeData
      });
      
      setTheme(updatedTheme);
      storageService.saveTheme(updatedTheme);
    } catch (error) {
      console.error('Failed to update theme:', error);
    }
  };

  const setMode = (mode) => {
    if (isValidThemeMode(mode)) {
      updateTheme({ mode });
    } else {
      console.warn('Invalid theme mode:', mode);
    }
  };

  const setColor = (color) => {
    if (isValidHexColor(color)) {
      updateTheme({ color });
    } else {
      console.warn('Invalid color format:', color);
    }
  };

  const toggleMode = () => {
    const newMode = theme.mode === 'Dark' ? 'Light' : 'Dark';
    setMode(newMode);
  };

  const toggleSettings = () => {
    updateTheme({ settingsOpen: !theme.settingsOpen });
  };

  const resetTheme = () => {
    const defaultTheme = new Theme({
      mode: THEME_CONFIG.DEFAULT_MODE,
      color: THEME_CONFIG.DEFAULT_COLOR,
      settingsOpen: false
    });
    
    setTheme(defaultTheme);
    storageService.saveTheme(defaultTheme);
  };

  return {
    theme,
    isLoading,
    setMode,
    setColor,
    toggleMode,
    toggleSettings,
    resetTheme,
    isDarkMode: theme.isDarkMode(),
  };
};
