import React, {useEffect, useState} from 'react';
import AdvertCard from './components/AdvertCard';
import esPoint from '../lib/actions/espoint';
import {useCookies} from 'react-cookie';

function Home(){

  const [cookies, setCookie] = useCookies(['token']);

  const [provinceAds, setProvinceAds] = useState([]);
  const [appFilters, setAppFilters] = useState({});

  useEffect(() =>{
    (async () => {
      const adsProvince = await esPoint.get('/browse?latest=province&v=Western-Cape&c=3');
      setProvinceAds(adsProvince?.data);

      const filters = await esPoint.get('/filters');

      setAppFilters(filters);

    })()
  },[]);

  const adRowProvince = provinceAds.map((item) => { return ( <AdvertCard item={item}/>) });
  console.log(appFilters.data)
  return (
      <section>
        <div className="row">
          {adRowProvince}
        </div>

      </section>


  )
}

export default Home;
