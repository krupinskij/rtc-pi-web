import axios from 'axios';

import { CameraCode, CameraRegisterInput } from './model';

export const registerCamera = async (
  cameraRegisterInput: CameraRegisterInput
): Promise<CameraCode> => {
  const response = await axios.post<CameraCode>('/camera/register', cameraRegisterInput);

  return response.data;
};
