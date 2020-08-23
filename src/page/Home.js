import React, {useEffect, useState} from 'react';
import AdvertCard from './components/AdvertCard';
import esPoint from '../lib/actions/espoint';

function Home() {
  const [provList, setProvList] = useState([]);

  useEffect(() => {
    (async () => {
      const homeprov = await esPoint.get('/home-prov');
      setProvList(homeprov.data);
    })();
  }, []);

  const adRows = provList.map((provAds, i) => {
    return (
        <div className='home-ads' style={{marginTop:'10px'}}>
              <div className='row banner'>
                <div className='col '>
                    <h3>{provAds.province}</h3>
                </div>
                <div className='col text-right'>
                    <h3><a href={`/property/province/${provAds.province}`}>view all >></a></h3>
                </div>
              </div>
              <div className="row" key={i}>
               { provAds.ads.map((ad, i)=> <AdvertCard item={ad} key={i} /> ) }
              </div>
        </div>
    )
  });


  return (<>
        {adRows}

        </>

  )
}

export default Home;
