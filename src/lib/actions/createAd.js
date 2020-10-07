import endpoint from './endpoint';

async function CreateAd(params) {
  const res = await endpoint.post('/advert/create', params);
  return res.data;
}

export default CreateAd;
