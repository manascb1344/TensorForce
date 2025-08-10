import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import LandingPage from './LandingPage.jsx';
import LoginPage from './LoginPage.jsx';
import ContactPage from './ContactPage.jsx';
import DashboardPage from './DashboardPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import LoadingComponent from '../components/LoadingComponent.jsx';

/**
 * Protected route component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

/**
 * Main app routes component
 * Handles routing and authentication
 */
const AppRoutes = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route
        path="/dashboard/*"
        element={<ProtectedRoute element={<DashboardPage />} />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
