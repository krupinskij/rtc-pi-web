import { atom } from 'recoil';

import { User } from './model';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const isLoggedState = atom<boolean>({
  key: 'isLoggedState',
  default: true,
});
