import axios from 'axios';
import { StorageKey } from 'model';

import config from 'config';

axios.defaults.baseURL = `${config.BASE_URL}/api`;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept-Language'] =
  localStorage.getItem(StorageKey.Language) || 'pl';
