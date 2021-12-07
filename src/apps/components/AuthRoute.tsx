import React from 'react';
import { Navigate } from 'react-router';

import useAuth from 'auth/useAuth';

const AuthRoute: React.FC = ({ children }) => {
  const { isLogged } = useAuth();

  return isLogged ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthRoute;
