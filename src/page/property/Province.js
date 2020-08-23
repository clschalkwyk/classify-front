import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AdvertCard from '../components/AdvertCard';
import AdvertPromoCard from '../components/AdvertPromoCard';
import esPoint from '../../lib/actions/espoint';


function Province() {
  let {province} = useParams();

  const [provList, setProvList] = useState([]);
  const [promoAds, setPromoAds] = useState([]);

  useEffect(() => {
    (async () => {
      const homeprov = await esPoint.get(`/adsby-province?province=${province}`);
      setProvList(homeprov.data);

      setPromoAds((await esPoint.get(`/promo-province?province=${province}`)).data)

    })();
  }, [province]);

  return (
      <>
      <div className='row'>
        <div className='col-sm-12'>
          <h3 >{province}</h3>
        </div>
      </div>
        <div className='row'>
          {promoAds && promoAds.map((ad, i) =>{
            return <AdvertPromoCard item={ad} key={i} />;
          })}
        </div>
      <div className='row'>
        {provList && provList.map((ad, i) => {
          return (
                 <AdvertCard item={ad} key={i}/>
            )
          })
        }
      </div>
</>
  )
}

export default Province;
