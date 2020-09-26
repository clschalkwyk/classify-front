import endpoint from '../../endpoints/auth';

async function Signin(params){
  return await endpoint.post('/auth/login', params);
}

export  default Signin;
