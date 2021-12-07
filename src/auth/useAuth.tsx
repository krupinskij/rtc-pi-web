import axios from 'axios';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { loginUser, logoutUser, refreshToken, registerUser } from './authService';
import { LoginInput, RegisterInput, User } from './model';
import { isLoggedState, userState } from './state';

const useAuth = (): {
  user: User | null;
  isLogged: boolean;
  checkUser: () => void;
  login: (loginInput: LoginInput) => Promise<void>;
  register: (registerInput: RegisterInput) => Promise<void>;
  logout: () => void;
} => {
  const [user, setUser] = useRecoilState<User | null>(userState);
  const [isLogged, setIsLogged] = useRecoilState(isLoggedState);

  const login = async (loginInput: LoginInput) => {
    const user = await loginUser(loginInput);

    setIsLogged(true);
    setUser(user);
  };

  const register = async (registerInput: RegisterInput) => {
    const user = await registerUser(registerInput);

    setIsLogged(true);
    setUser(user);
  };

  const logout = () => {
    logoutUser();
    setIsLogged(false);
    setUser(null);
  };

  const checkUser = useCallback(async () => {
    const csrfToken = sessionStorage.getItem('csrf-token');

    if (!csrfToken) {
      setIsLogged(false);
      return;
    }

    axios.defaults.headers.common['X-Csrf-Token'] = csrfToken;
    const user = await refreshToken();
    setUser(user);
  }, [setUser, setIsLogged]);

  return { user, isLogged, checkUser, login, register, logout };
};

export default useAuth;
