import axios from 'axios';
import { FIREBASE_DATABASE } from '../Constants';

const AxiosRequests = axios.create();
AxiosRequests.defaults.baseURL = FIREBASE_DATABASE;
AxiosRequests.defaults.headers.common = {
  'Content-Type': 'application/json',
};

export default AxiosRequests;
