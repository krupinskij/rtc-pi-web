import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DashboardPage from 'pages/DashboardPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';

import AuthRoute from './components/AuthRoute';
import NotAuthRoute from './components/NotAuthRoute';

const RoutesApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <DashboardPage />
          </AuthRoute>
        }
      />
      <Route
        path="/login"
        element={
          <NotAuthRoute>
            <LoginPage />
          </NotAuthRoute>
        }
      />
      <Route
        path="/register"
        element={
          <NotAuthRoute>
            <RegisterPage />
          </NotAuthRoute>
        }
      />
    </Routes>
  );
};

export default RoutesApp;
