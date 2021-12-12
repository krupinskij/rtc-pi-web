import axios from 'axios';

import { Camera } from 'pages/DashboardPage/model';

import { CameraAddInput } from './model';

export const addCamera = async (cameraAddInput: CameraAddInput): Promise<Camera> => {
  const response = await axios.post<Camera>('/camera/add', cameraAddInput);

  return response.data;
};
