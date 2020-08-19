import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AdvertCard from '../components/AdvertCard';
import AdvertPromoCard from '../components/AdvertPromoCard';
import esPoint from '../../lib/actions/espoint';
import {useCookies} from 'react-cookie';
import getStat, {statName} from '../../lib/stat';

function View() {
  let {urlkey} = useParams();
  //let {province} = useParams();


  const [cookies, setCookie] = useCookies(['token']);
  const [adv, setAdv] = useState({});

  useEffect(() => {
    (async () => {

      setAdv((await esPoint.get(`/getPropAd?id=${urlkey}`)).data);

    })();
  }, []);

  console.log(adv);
  const statGarages = getStat(adv,'garages');
  const statBedrooms = getStat(adv,'bedrooms');
  const statBathrooms = getStat(adv,'bathrooms');
  return (
      <>
        {adv &&
        <>
          <div className='row'>
            <div className='col-sm-12'>
              <h3>{adv.title}</h3>
              <img src="http://lorempixel.com/540/260/city/" className="card-img-bottom"/>
            </div>
          </div>
          <div className='row'>
            <div className="col-sm-12">
              <h5>
                R {new Intl.NumberFormat('en-ZA', {maximumSignificantDigits: 3}).format(adv.askingPrice)}<br/>

                {
                  statBedrooms &&
                  <>
                  <span className='badge badge-pill badge-info'>   {statBedrooms} <i className="fa fa-bed"/></span>
                  </>
                }

                {statBathrooms &&
                  <>
                   <span className='badge badge-pill badge-info'> {statBathrooms} <i className="fa fa-bath"/> </span>
                  </>
                }

                {
                  statGarages &&
                  <>
                    <span className='badge badge-pill badge-info'> {statGarages} <i className="fa fa-car"/> </span>
                  </>

                }

              </h5>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-7' style={{borderTop:"1px solid #000000"}}>
              <span dangerouslySetInnerHTML={{__html: adv.description}}></span>
            </div>
            <div className='col-sm-4 offset-1 row' style={{fontSize: '13px',borderTop: "1px solid #000000"}}>
                <div className='col-md-12'>
                  <h5>Technical Details</h5>
                </div>
                <div className='row-md-12'>

                <ul style={{listStyle: 'none', textTransform: 'capitalize'}}>
                  <li>Province : {adv.address?.province}</li>
                  <li>City : {adv.address?.city}</li>
                  <li>Suburb : {adv.address?.suburb}</li>
                  <li>&nbsp;</li>
                  {adv.stat?.count?.map((i) => <li>{i.val} {i.attrib.replace('_', ' ')} </li>)}
                  <li>&nbsp;</li>
                  {adv.stat?.size?.map((i) => <li>{i.attrib.replace('_', ' ')} {i.val} <sup>2</sup>m</li>)}
                  <li>&nbsp;</li>
                  {adv.stat?.has?.map((i) => <li>{i.attrib.replace('_', ' ')} {i.val} <i className='fa fa-check'/></li>)}
                </ul>
                </div>
            </div>
          </div>

          <div className='row'>
            <button className='btn-danger btn badge-pill'>sign in to contact advertiser</button>
            [contact form]
          </div>
        </>
        }

      </>
  );
}

export default View;
