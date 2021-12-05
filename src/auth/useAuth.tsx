import axios from 'axios';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';

import { LoginInput, RegisterInput, Token, User, UserFromToken } from './model';
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

  const checkUser = () => {
    const token = cookies.get('Authorization');

    if (token) {
      consumeToken(token);
    }
  };

  const login = async (loginInput: LoginInput) => {
    const response = await axios.post<Token>('/auth/login', loginInput);
    const token = response.data.token;

    consumeToken(token);
  };

  const register = async (registerInput: RegisterInput) => {
    const response = await axios.post<Token>('/auth/register', registerInput);
    const token = response.data.token;

    consumeToken(token);
  };

  const refresh = async () => {
    const response = await axios.post<Token>('/auth/refresh');
    const token = response.data.token;

    consumeToken(token);
  };

  const consumeToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    cookies.set('Authorization', token);

    const { exp, iat, ...newUser } = jwtDecode<UserFromToken>(token);

    const timeout = exp * 1000 - Date.now();
    timeoutRef.current = setTimeout(() => refresh(), timeout * 0.9);

    setUser(newUser);
  };

  const logout = () => {
    cookies.remove('Authorization');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setUser(null);
  };

  return { user, checkUser, login, register, logout };
};

export default useAuth;
