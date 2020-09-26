import endpoint from '../../endpoints/auth';

async function Signup(params) {
  const res = await endpoint.post('/auth/signup', params);
  return res.data;
}

export default Signup;
