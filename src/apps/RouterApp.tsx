import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const RouterApp: React.FC = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterApp;
