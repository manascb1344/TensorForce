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

// Stats Configuration
export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+",
  },
];

// Features Configuration
export const features = [
  {
    id: "feature-1",
    icon: "star",
    title: "Profitable Trades",
    content:
      "The best trading platforms offer some tantalizing combinations of data analysis and investment opportunities.",
  },
  {
    id: "feature-2",
    icon: "shield",
    title: "100% Secured",
    content:
      "We take proactive steps make sure your information and transactions are secure.",
  },
  {
    id: "feature-3",
    icon: "send",
    title: "Portfolio Transfer",
    content:
      "A seamless portfolio transfer can save you a lot of time and effort.",
  },
];

// Feedback Configuration
export const feedback = [
  {
    id: "feedback-1",
    content:
      "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: "people01",
  },
  {
    id: "feedback-2",
    content:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: "people02",
  },
  {
    id: "feedback-3",
    content:
      "It is usually people in the money business, finance, and international trade that are really rich.",
    name: "Kenn Gallagher",
    title: "Founder & Leader",
    img: "people03",
  },
];

// Clients Configuration
export const clients = [
  {
    id: "client-1",
    logo: "airbnb",
  },
  {
    id: "client-2",
    logo: "binance",
  },
  {
    id: "client-3",
    logo: "coinbase",
  },
  {
    id: "client-4",
    logo: "dropbox",
  },
];

// Footer Links Configuration
export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.TensorForce.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.TensorForce.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.TensorForce.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.TensorForce.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.TensorForce.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.TensorForce.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.TensorForce.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.TensorForce.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.TensorForce.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.TensorForce.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.TensorForce.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.TensorForce.com/become-a-partner/",
      },
    ],
  },
];

// Social Media Configuration
export const socialMedia = [
  {
    id: "social-media-1",
    icon: "instagram",
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: "facebook",
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: "twitter",
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: "linkedin",
    link: "https://www.linkedin.com/",
  },
];

// Error Messages
export const ERROR_MESSAGES = {
  AUTHENTICATION_FAILED: 'Authentication failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_USER_DATA: 'Invalid user data provided.',
  INVALID_STOCK_SYMBOL: 'Invalid stock symbol provided.',
  API_ERROR: 'API error occurred. Please try again later.',
};
