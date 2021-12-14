import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import useAuth from 'auth/useAuth';

const AuthApp: React.FC = ({ children }) => {
  const { checkUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.response.use(
      (value) => {
        return value;
      },
      (error: any) => {
        const { data, status } = error.response;
        if (status === 401 && data.authRetry) {
          console.log(data.message);
          navigate('/logout');
        }

        return Promise.reject(error);
      }
    );

    checkUser().finally(() => {
      setIsLoading(false);
    });
  }, [checkUser, navigate]);

  return isLoading ? <CircularProgress /> : <>{children}</>;
};

export default AuthApp;
