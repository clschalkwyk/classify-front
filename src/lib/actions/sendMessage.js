import endpoint from './endpoint';

async function SendMessage(params) {
  const res = await endpoint.post('/messages/new-message', params);
  return res.data;
}

export default SendMessage;
