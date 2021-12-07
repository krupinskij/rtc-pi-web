import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { LoginInput, RegisterInput, Tokens, User, UserFromToken } from './model';

let timeout: NodeJS.Timeout;

export const loginUser = async (loginInput: LoginInput): Promise<User> => {
  const response = await axios.post<Tokens>('/auth/login', loginInput);
  const { accessToken, csrfToken } = response.data;

  setCsrfToken(csrfToken);

  return consumeAccessToken(accessToken);
};

export const registerUser = async (registerInput: RegisterInput): Promise<User> => {
  const response = await axios.post<Tokens>('/auth/register', registerInput);
  const { accessToken, csrfToken } = response.data;

  setCsrfToken(csrfToken);

  return consumeAccessToken(accessToken);
};

export const logoutUser = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  delete axios.defaults.headers.common['X-Csrf-Token'];
  sessionStorage.removeItem('csrf-token');
};

export const refreshToken = async (): Promise<User> => {
  const response = await axios.post<Tokens>('/auth/refresh');
  const { accessToken, csrfToken } = response.data;

  setCsrfToken(csrfToken);

  return consumeAccessToken(accessToken);
};

const consumeAccessToken = (accessToken: string): User => {
  const { exp, iat, ...newUser } = jwtDecode<UserFromToken>(accessToken);

  const ms = exp * 1000 - Date.now();
  timeout = setTimeout(() => refreshToken(), ms * 0.9);

  return newUser;
};

const setCsrfToken = (csrfToken: string) => {
  axios.defaults.headers.common['X-Csrf-Token'] = csrfToken;
  sessionStorage.setItem('csrf-token', csrfToken);
};
