import axios from 'axios';

import config from 'config';
import { StorageKey } from 'model';

axios.defaults.baseURL = `${config.BASE_URL}/api`;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept-Language'] =
  localStorage.getItem(StorageKey.Language) || 'pl';
