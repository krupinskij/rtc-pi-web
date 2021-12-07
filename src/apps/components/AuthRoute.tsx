import React from 'react';
import { Navigate } from 'react-router';

import useAuth from 'auth/useAuth';

const AuthRoute: React.FC = ({ children }) => {
  const { user } = useAuth();

  return !!user ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthRoute;
