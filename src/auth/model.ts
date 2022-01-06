import { string } from 'yup/lib/locale';

export type Tokens = {
  accessToken: string;
  csrfToken: string;
};

export type User = {
  _id: string;
  email: string;
};

export type UserFromToken = User & {
  exp: number;
  iat: number;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  email: string;
  password: string;
};

export type RegisterInputWithRepeated = RegisterInput & {
  repeatPassword: string;
};
