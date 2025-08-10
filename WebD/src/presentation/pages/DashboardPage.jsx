import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme.js';
import { StockContextProvider } from '../providers/StockContextProvider.jsx';
import { useAppContext } from '../providers/AppContextProvider.jsx';
import {
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from './MainDashboard/components/index.jsx';
import {
  Dashboard,
  Orders,
  News,
  Contribute,
} from './MainDashboard/pages/index.jsx';
import Profile from './MainDashboard/pages/Profile.jsx';
import Positions from './MainDashboard/pages/Positions.jsx';
import Heatmap from './MainDashboard/pages/Heatmap.jsx';
import Shop from './MainDashboard/pages/Shop.jsx';
import SentimentPage from './MainDashboard/pages/SentimentPage.jsx';
import CompanyFinancials from './MainDashboard/CompanyFinancials/CompanyFinancials.jsx';
import './MainDashboard/material.css';
import './MainDashboard/App.css';

/**
 * Dashboard page component
 * Main dashboard with navigation and routing
 */
const DashboardPage = () => {
  const { activeMenu } = useAppContext();
  const { theme, isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
              : 'dark:bg-main-dark-bg bg-main-bg min-h-screen w-full flex-2'
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navber w-full">
            <Navbar />
          </div>
          
          <div>
            {theme.settingsOpen && <ThemeSettings />}
            <StockContextProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/positions" element={<Positions />} />
                <Route path="/news" element={<News />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sentiment" element={<SentimentPage />} />
                <Route path="/financials" element={<CompanyFinancials />} />
                <Route path="/heatmap" element={<Heatmap />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contribute" element={<Contribute />} />
              </Routes>
            </StockContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
