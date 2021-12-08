export type CameraRegisterInput = {
  password: string;
};

export type CameraRegisterRepeatedInput = CameraRegisterInput & {
  repeatedPassword: string;
};

export type CameraCode = {
  code: string;
};
