export type Token = {
  token: string;
};

export type User = {
  _id: string;
  username: string;
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
  username: string;
  password: string;
};
