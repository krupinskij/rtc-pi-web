import axios from 'axios';

import { Camera } from './model';

export const getOwnedCameras = async (): Promise<Camera[]> => {
  const response = await axios.get<Camera[]>('/camera/owned');

  return response.data;
};

export const getUsedCameras = async (): Promise<Camera[]> => {
  const response = await axios.get<Camera[]>('/camera/used');

  return response.data;
};
