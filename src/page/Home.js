import React from 'react';
import AdvertCard from './components/AdvertCard';

import {useCookies} from 'react-cookie';

function Home(){

  const [cookies, setCookie] = useCookies(['token']);
  console.log(cookies);

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
