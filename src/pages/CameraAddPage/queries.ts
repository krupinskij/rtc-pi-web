import axios from 'axios';

import { CameraAddInput } from './model';

export const addCamera = async (cameraAddInput: CameraAddInput): Promise<void> => {
  await axios.post('/camera/add', cameraAddInput);
};
