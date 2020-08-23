import Axios from 'axios';
//import {hasToken, getToken} from '../token';

let esPoint;
// if(hasToken()){
//   esPoint = Axios.create({
//     baseURL: process.env.REACT_APP_ES_ENDPOINT,
//     headers: {
//       'content-type': 'application/json',
//       'Authorization': `Bearer ${getToken()}`
//     }
//   });
// }else{
  esPoint = Axios.create({
    baseURL: process.env.REACT_APP_ES_ENDPOINT,
    headers: {
      'content-type': 'application/json',
    },

  });
// }

export default esPoint;
