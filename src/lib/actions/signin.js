import endpoint from './endpoint';

async function Signin(params){
  return await endpoint.post('/auth/login', params);
}

export  default Signin;