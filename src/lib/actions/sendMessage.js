import endpoint from './endpoint';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function SendMessage(params) {
  const token = cookies.get('token');
  const res = await endpoint.post('/messages/new-message', params,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
}

export default SendMessage;
