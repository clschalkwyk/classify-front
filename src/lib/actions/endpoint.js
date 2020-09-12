import Axios from 'axios';
import {hasToken, getToken} from '../token';

let axiosApi;
if(hasToken()){
  console.log("AUTHED AXIOS");
   axiosApi = Axios.create({
    baseURL: process.env.REACT_APP_SERVICE_ENDPOINT,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });
}else{
  console.log("UNAUTHED AXIOS");
   axiosApi = Axios.create({
    baseURL: process.env.REACT_APP_SERVICE_ENDPOINT,
    headers: {
      'content-type': 'application/json',
    }
  });
}

export default axiosApi;
