import React, {useEffect, useState} from 'react';
import AdvertCard from './components/AdvertCard';
import {feedByProvPt, feedByProvince, feedByAdvPt} from '../lib/actions/feed';
import Filterbar from './components/Filterbar';

function Home() {
  const [provList, setProvList] = useState([]);

  useEffect(() => {
    (async () => {

      //const feedProv = await feedByProvince();
      const feedProv = await feedByAdvPt();
      console.log(feedProv);

      // let found= {};
      // feedProv.map((e) => {
      //   if(!found[e.address.province]){
      //     found[e.address.province] = {'ads' : []};
      //   }
      //
      //   found[e.address.province].push(e);
      // });
      // console.log(found);

      setProvList(feedProv);
    })();
  }, []);

  const adRows = provList.map((provAds, i) => {
    return (
        <AdvertCard item={provAds} key={i}/>
    );
  });

  return (
      <>
      <Filterbar/>
      <div className='row' style={{padding: '16px'}}>
        {adRows}
      </div>
        </>
  );
}

export default Home;
