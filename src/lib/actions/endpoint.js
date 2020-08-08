import Axios from 'axios';
import {hasToken, getToken} from '../token';

let axiosApi;
if(hasToken()){
   axiosApi = Axios.create({
    baseURL: process.env.REACT_APP_SERVICE_ENDPOINT,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });
}else{
   axiosApi = Axios.create({
    baseURL: process.env.REACT_APP_SERVICE_ENDPOINT,
    headers: {
      'content-type': 'application/json',
    }
  });
}

export default axiosApi;
