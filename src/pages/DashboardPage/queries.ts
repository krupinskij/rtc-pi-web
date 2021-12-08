import axios from 'axios';

import { Camera } from './model';

export const getCameras = async (): Promise<Camera[]> => {
  const response = await axios.get<Camera[]>('/user/camera');

  return response.data;
};
