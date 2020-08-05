import endpoint from './endpoint';

async function Signup(params) {
  const res = await endpoint.post('/auth/signup', params);
  return res.data;
}

export default Signup;
