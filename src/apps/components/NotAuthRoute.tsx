import React from 'react';
import { Navigate } from 'react-router';

import useAuth from 'auth/useAuth';

const NotAuthRoute: React.FC = ({ children }) => {
  const { user } = useAuth();

  return !user ? <>{children}</> : <Navigate to="/" />;
};

export default NotAuthRoute;
