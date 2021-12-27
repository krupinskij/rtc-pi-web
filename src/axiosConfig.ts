import axios from 'axios';

import config from 'config';

axios.defaults.baseURL = `${config.BASE_URL}/api`;
axios.defaults.withCredentials = true;
