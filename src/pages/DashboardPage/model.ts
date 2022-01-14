export type Camera = {
  _id: string;
  name: string;
};

export type EditCameraInput = {
  newName?: string;
  newPassword?: string;
  password: string;
};

export type EditRepeatedCameraInput = EditCameraInput & {
  repeatNewPassword?: string;
};
