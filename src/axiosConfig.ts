import axios from 'axios';

import config from 'config';

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.withCredentials = true;
