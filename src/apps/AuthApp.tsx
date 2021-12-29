import { Alert, CircularProgress, Snackbar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import useAuth from 'auth/useAuth';

const AuthApp: React.FC = ({ children }) => {
  const { checkUser } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    checkUser().finally(() => {
      setIsLoading(false);
    });
  }, [checkUser]);

  useEffect(() => {
    const reqInterceptor = axios.interceptors.response.use(
      (value) => {
        return value;
      },
      (error: any) => {
        const { data, status } = error.response;
        if (status === 401 && data?.authRetry) {
          setErrorMessage(data?.message);
          navigate('/logout');
        }

        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(reqInterceptor);
  }, [navigate]);

  const handleClose = () => {
    setErrorMessage('');
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      {children}
      <Snackbar
        open={!!errorMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }} onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthApp;
