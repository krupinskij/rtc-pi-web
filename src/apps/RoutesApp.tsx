import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CameraAddPage from 'pages/CameraAddPage';
import CameraRegisterPage from 'pages/CameraRegisterPage';
import DashboardPage from 'pages/DashboardPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';

import AuthRoute from './components/AuthRoute';
import LogoutRoute from './components/LogoutRoute';
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
        path="/camera/add"
        element={
          <AuthRoute>
            <CameraAddPage />
          </AuthRoute>
        }
      />
      <Route
        path="/camera/register"
        element={
          <AuthRoute>
            <CameraRegisterPage />
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
      <Route path="/logout" element={<LogoutRoute />} />
    </Routes>
  );
};

export default RoutesApp;
