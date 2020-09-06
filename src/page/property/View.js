import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import esPoint from '../../lib/actions/espoint';
import getStat from '../../lib/stat';
import ContactForm from './ContactForm';
import GoogleMapReact from 'google-map-react';

const MapMarker = ({text}) => <div className='pin'>{text}</div>;

function View() {
  const MAP_KEY ='AIzaSyAc_llDV6vAELqGORE0uH5D11UFUNMTKOU';


  let {urlkey} = useParams();
  //let {province} = useParams();
  const [adv, setAdv] = useState({});
  const [center, setCenter] = useState({lat: -33.9188, lng: 18.4233});
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    (async () => {
      setAdv((await esPoint.get(`/getPropAd?id=${urlkey}`)).data);
    })();
  }, [urlkey]);


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
              <small style={{fontSize:'12px', fontWeight:'bold'}}>{adv.address?.province} > {adv.address?.city} > {adv.address?.suburb}</small><br/>
              <img src="http://lorempixel.com/540/260/city/" className="card-img-bottom" alt={adv.title}/>
            </div>
          </div>
          <div className='row adstats'>
            <div className="col-sm-12">
              <h5>
                R {new Intl.NumberFormat('en-ZA', {maximumSignificantDigits: 3}).format(adv.askingPrice)}<br/>
                {
                  statBedrooms &&
                  <>
                  <span className='badge badge-secondary'>   {statBedrooms} <i className="fa fa-bed"/></span>
                  </>
                }
                {statBathrooms &&
                  <>
                   <span className='badge badge-secondary'> {statBathrooms} <i className="fa fa-bath"/> </span>
                  </>
                }
                {
                  statGarages &&
                  <>
                    <span className='badge badge-secondary'> {statGarages} <i className="fa fa-car"/> </span>
                  </>

                }

              </h5>
            </div>
          </div>
          <div className='row adpage'>
            <div className='col-xs-12 col-sm-7' style={{borderTop:"1px solid #000000"}}>
              <span dangerouslySetInnerHTML={{__html: adv.description}}></span>
            </div>
            <div className='col-xs-12 col-sm-4 offset-md-1 row' style={{fontSize: '13px',borderTop: "1px solid #000000"}}>
                <div className='col-md-12'>
                  <h5>Technical Details</h5>
                </div>
                <div className='row-md-6 row-xs-12'>
                <ul style={{listStyle: 'none', textTransform: 'capitalize'}}>
                  {adv.stat?.count?.map((i,v) => <li key={v}>{i.val} {i.attrib.replace('_', ' ')} </li>)}
                  <li>&nbsp;</li>
                  {adv.stat?.size?.map((i,v) => <li key={v}>{i.attrib.replace('_', ' ')} {i.val} <sup>2</sup>m</li>)}
                </ul>
                </div>
                <div className='row-md-6 row-xs-12'>
                <ul style={{listStyle: 'none', textTransform: 'capitalize'}}>
                  {adv.stat?.has?.map((i,v) => <li key={v}>{i.attrib.replace('_', ' ')} {i.val} <i className='fa fa-check'/></li>)}
                </ul>
                </div>
            </div>
          </div>
          <div style={{height: '50vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: MAP_KEY}}
                defaultCenter={center}
                defaultZoom={zoom}
            >
              <MapMarker lat={-33.91} lng={18.42} text=""></MapMarker>
            </GoogleMapReact>
          </div>
          <hr/>
          <ContactForm id={adv.pk} />
        </>
        }
      </>
  );
}

export default View;
