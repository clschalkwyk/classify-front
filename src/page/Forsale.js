import React, {useEffect, useState} from 'react';
import {listByPropTypeAdType} from '../lib/actions/list';
import AdvertCard from './components/AdvertCard';

function Forsale() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await listByPropTypeAdType('', '');
      setAds(list);

    })();

  }, []);

  return (
      <>
        <section>
          <h2>For Sale</h2>
          <h5>All the 'For Sale' shit</h5>
        </section>
        <div className='row' style={{padding: '16px'}}>          {
            ads && ads.map((ad, i) => {
              return <AdvertCard item={ad} key={i}/>;
            })
          }
        </div>
      </>
  );
}

export default Forsale;
