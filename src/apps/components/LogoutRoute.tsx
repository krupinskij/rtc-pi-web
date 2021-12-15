import React, { useEffect } from 'react';
import { Navigate } from 'react-router';

import useAuth from 'auth/useAuth';

const LogoutRoute: React.FC = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/login" />;
};

export default LogoutRoute;
