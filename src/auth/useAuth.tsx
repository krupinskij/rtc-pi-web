import { useRef } from 'react';
import { LoginInput, RegisterInput, Token, User, UserFromToken } from './model';
import axios from 'axios';

import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useRecoilState } from 'recoil';
import { userState } from './state';
const useAuth = (): {
  user: User | null;
  login: (loginInput: LoginInput) => Promise<void>;
  register: (registerInput: RegisterInput) => void;
  logout: () => void;
} => {
  const [user, setUser] = useRecoilState<User | null>(userState);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const login = async (loginInput: LoginInput) => {
    try {
      const response = await axios.post<Token>('http://localhost:3030/api/auth/login', loginInput);
      const token = response.data.token;

      cookies.set('Authorization', `Bearer ${token}`);

      const { exp, iat, ...newUser } = jwtDecode<UserFromToken>(token);

      const timeout = exp * 1000 - Date.now();
      timeoutRef.current = setTimeout(() => refresh(), timeout * 0.9);

      setUser(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (registerInput: RegisterInput) => {
    try {
      const response = await axios.post<Token>(
        'http://localhost:3030/api/auth/register',
        registerInput
      );
      const token = response.data.token;

      cookies.set('Authorization', `Bearer ${token}`);

      const { exp, iat, ...newUser } = jwtDecode<UserFromToken>(token);

      const timeout = exp * 1000 - Date.now();
      timeoutRef.current = setTimeout(() => refresh(), timeout * 0.9);

      setUser(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = async () => {
    try {
      const response = await axios.post<Token>(
        'http://localhost:3030/api/auth/refresh',
        {},
        {
          headers: {
            Authorization: cookies.get('Authorization') || '',
          },
        }
      );
      const token = response.data.token;

      cookies.set('Authorization', `Bearer ${token}`);

      const { exp, iat, ...newUser } = jwtDecode<UserFromToken>(token);

      const timeout = exp * 1000 - Date.now();
      timeoutRef.current = setTimeout(() => refresh(), timeout * 0.9);

      setUser(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    cookies.remove('authorization');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setUser(null);
  };

  return { user, login, register, logout };
};

export default useAuth;
