import axios from 'axios';

import { EditUserInput } from './model';

export const editUser = async (editUserInput: EditUserInput): Promise<void> => {
  await axios.put('/user/edit', editUserInput);
};
