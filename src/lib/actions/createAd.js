import endpoint from './endpoint';
import endpointLocal from './endpointLocal';


async function CreateAd(params) {
  const res = await endpoint.post('/advert/create', params);
/*,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
* */

  if(res.data?.pk){
    console.log("WROTE INTO DYNAMO");

    const res = await endpointLocal.post('/advert/indexAdvert', params, {
      // withCredentials: true,
    });

    console.log(res);

  }

  return res.data;
}

export default CreateAd;
