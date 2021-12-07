import { atom } from 'recoil';

import { User } from './model';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});
