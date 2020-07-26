import Axios from 'axios';

const axiosApi = Axios.create({
  baseURL: process.env.REACT_APP_SERVICE_ENDPOINT,
  headers: {
    'content-type': 'application/json',
  },
});

export default axiosApi;