import React, {useEffect, useState} from 'react';
import AdvertCard from './components/AdvertCard';
import esPoint from '../lib/actions/espoint';
import {useCookies} from 'react-cookie';

function Home(){

  const [cookies, setCookie] = useCookies(['token']);
  console.log(cookies);

  const [homeAds, setHomeAds] = useState([]);

  useEffect(() =>{
    (async () => {
      const ads = await esPoint.get('/browse');
      setHomeAds(ads?.data);
      console.log(ads.data);
    })()
  },[]);

  return (
      <section>
        <div className="row">
          <AdvertCard/>
          <AdvertCard/>
          <AdvertCard/>
          <AdvertCard/>
          <AdvertCard/>
          <AdvertCard/>

        </div>

      </section>


  )
}

export default Home;
