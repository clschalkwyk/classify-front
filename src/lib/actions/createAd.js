import endpoint from './endpoint';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function CreateAd(params) {
  const token = cookies.get('token');
  const res = await endpoint.post('/advert/create', params,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export default CreateAd;