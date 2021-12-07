import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

import useAuth from 'auth/useAuth';

const AuthApp: React.FC = ({ children }) => {
  const { checkUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser().then(() => {
      setIsLoading(false);
    });
  }, [checkUser]);

  return isLoading ? <CircularProgress /> : <>{children}</>;
};

export default AuthApp;
