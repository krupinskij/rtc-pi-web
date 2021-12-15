import axios from 'axios';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { loginUser, logoutUser, refreshToken, registerUser } from './authService';
import { LoginInput, RegisterInput, User } from './model';
import { userState } from './state';

const useAuth = (): {
  user: User | null;
  login: (loginInput: LoginInput) => Promise<void>;
  register: (registerInput: RegisterInput) => Promise<void>;
  logout: () => void;
  checkUser: () => Promise<void>;
} => {
  const [user, setUser] = useRecoilState<User | null>(userState);

  const login = async (loginInput: LoginInput) => {
    const user = await loginUser(loginInput);

    setUser(user);
  };

  const register = async (registerInput: RegisterInput) => {
    const user = await registerUser(registerInput);

    setUser(user);
  };

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, [setUser]);

  const checkUser = useCallback(async () => {
    const csrfToken = sessionStorage.getItem('csrf-token');

    if (!csrfToken) {
      return;
    }

    axios.defaults.headers.common['X-Csrf-Token'] = csrfToken;
    const user = await refreshToken();
    setUser(user);
  }, [setUser]);

  return { user, login, register, logout, checkUser };
};

export default useAuth;
