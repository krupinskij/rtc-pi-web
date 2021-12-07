import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import useAuth from 'auth/useAuth';

const RouterApp: React.FC = ({ children }) => {
  const { checkUser } = useAuth();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterApp;
