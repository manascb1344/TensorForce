/**
 * Application constants
 * Centralized configuration and constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://tensorforce-backend.onrender.com/api',
  TIMEOUT: 10000,
  ALPACA_BASE_URL: 'https://paper-api.alpaca.markets',
  ALPACA_TIMEOUT: 5000,
};

// Auth0 Configuration
export const AUTH0_CONFIG = {
  DOMAIN: 'dev-ovhg6woj2jzt3u4i.au.auth0.com',
  CLIENT_ID: 'pEXH5RDJNSLcLz8VAH3Ac5kpI4b6gq8w',
  REDIRECT_URI: window.location.origin,
};

// Theme Configuration
export const THEME_CONFIG = {
  DEFAULT_MODE: 'Dark',
  DEFAULT_COLOR: '#03C9D7',
  STORAGE_KEYS: {
    THEME_MODE: 'themeMode',
    COLOR_MODE: 'colorMode',
  },
};

// Navigation Configuration
export const NAV_LINKS = [
  { id: 'home', title: 'Home' },
  { id: 'features', title: 'Features' },
  { id: 'product', title: 'Product' },
  { id: 'clients', title: 'Clients' },
  { id: 'contact', title: 'Contact Us' },
];

// Dashboard Routes
export const DASHBOARD_ROUTES = [
  { path: '/', element: 'Dashboard' },
  { path: '/dashboard', element: 'Dashboard' },
  { path: '/positions', element: 'Positions' },
  { path: '/news', element: 'News' },
  { path: '/orders', element: 'Orders' },
  { path: '/profile', element: 'Profile' },
  { path: '/sentiment', element: 'SentimentPage' },
  { path: '/financials', element: 'CompanyFinancials' },
  { path: '/heatmap', element: 'Heatmap' },
  { path: '/shop', element: 'Shop' },
  { path: '/contribute', element: 'Contribute' },
];

// UI States
export const UI_STATES = {
  INITIAL: {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  AUTHENTICATION_FAILED: 'Authentication failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_USER_DATA: 'Invalid user data provided.',
  INVALID_STOCK_SYMBOL: 'Invalid stock symbol provided.',
  API_ERROR: 'API error occurred. Please try again later.',
};
