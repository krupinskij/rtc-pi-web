export type EditUserInput = {
  newPassword?: string;
  password: string;
};

export type EditRepeatedUserInput = EditUserInput & {
  repeatNewPassword?: string;
};
