import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';

import { LoginInput, RegisterInput, Tokens, User, UserFromToken } from './model';
import { userState } from './state';

const useAuth = (): {
  user: User | null;
  checkUser: () => void;
  login: (loginInput: LoginInput) => Promise<void>;
  register: (registerInput: RegisterInput) => Promise<void>;
  logout: () => void;
} => {
  const [user, setUser] = useRecoilState<User | null>(userState);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const login = async (loginInput: LoginInput) => {
    const response = await axios.post<Tokens>('/auth/login', loginInput);
    const { accessToken, csrfToken } = response.data;

    consumeAccessToken(accessToken);
    setCsrfToken(csrfToken);
  };

  const register = async (registerInput: RegisterInput) => {
    const response = await axios.post<Tokens>('/auth/register', registerInput);
    const { accessToken, csrfToken } = response.data;

    consumeAccessToken(accessToken);
    setCsrfToken(csrfToken);
  };

  const refresh = async () => {
    const response = await axios.post<Tokens>('/auth/refresh');
    const { accessToken, csrfToken } = response.data;

    consumeAccessToken(accessToken);
    setCsrfToken(csrfToken);
  };

  const consumeAccessToken = (accessToken: string) => {
    const { exp, iat, ...newUser } = jwtDecode<UserFromToken>(accessToken);

    const timeout = exp * 1000 - Date.now();
    timeoutRef.current = setTimeout(() => refresh(), timeout * 0.9);

    setUser(newUser);
  };

  const setCsrfToken = (csrfToken: string) => {
    axios.defaults.headers.common['X-Csrf-Token'] = csrfToken;
    sessionStorage.setItem('csrf-token', csrfToken);
  };

  const logout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    delete axios.defaults.headers.common['X-Csrf-Token'];
    sessionStorage.removeItem('csrf-token');
    setUser(null);
  };

  const checkUser = useCallback(async () => {
    const csrfTokenFromStorage = sessionStorage.getItem('csrf-token');
    if (csrfTokenFromStorage) {
      axios.defaults.headers.common['X-Csrf-Token'] = csrfTokenFromStorage;
    }

    const response = await axios.post<Tokens>('/auth/refresh');
    const { accessToken, csrfToken } = response.data;

    const { exp, iat, ...newUser } = jwtDecode<UserFromToken>(accessToken);

    const timeout = exp * 1000 - Date.now();
    timeoutRef.current = setTimeout(() => refresh(), timeout * 0.9);

    axios.defaults.headers.common['X-Csrf-Token'] = csrfToken;
    sessionStorage.setItem('csrf-token', csrfToken);
  }, []);

  return { user, checkUser, login, register, logout };
};

export default useAuth;
