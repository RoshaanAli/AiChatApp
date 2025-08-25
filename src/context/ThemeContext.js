import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightColors = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  primary: '#007AFF',
  text: '#000000',
  textSecondary: '#6C757D',
  border: '#E9ECEF',
  userBubble: '#007AFF',
  aiBubble: '#F1F3F4',
};

const darkColors = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#0A84FF',
  text: '#FFFFFF',
  textSecondary: '#ADB5BD',
  border: '#2D2D2D',
  userBubble: '#0A84FF',
  aiBubble: '#2D2D2D',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('isDarkTheme');
      if (savedTheme !== null) {
        setIsDarkTheme(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    try {
      await AsyncStorage.setItem('isDarkTheme', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const colors = isDarkTheme ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
