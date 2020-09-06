import Axios from 'axios';
import {hasToken, getToken} from '../token';

let endpointLocal;
if(hasToken()){
  endpointLocal = Axios.create({
    baseURL: process.env.REACT_APP_SERVICE_ENDPOINT_LOCAL,
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
       'Access-Control-Allow-Origin': '*',

    }
  });
}else{
  endpointLocal = Axios.create({
    baseURL: process.env.REACT_APP_SERVICE_ENDPOINT_LOCAL,
    headers: {
      'content-type': 'application/json',

    }
  });
}

export default endpointLocal;
