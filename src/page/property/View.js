import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import getStat from '../../lib/stat';
import ContactForm from './ContactForm';
import GoogleMapReact from 'google-map-react';
import {getAdvert} from '../../lib/actions/feed';
import Slider from 'react-slick';

const MapMarker = ({text}) => <div className='pin'>{text}</div>;

function View() {
  const MAP_KEY = 'AIzaSyAc_llDV6vAELqGORE0uH5D11UFUNMTKOU';

  let {urlkey} = useParams();
  //let {province} = useParams();
  const [adv, setAdv] = useState({});
  const [center, setCenter] = useState({lat: -33.9188, lng: 18.4233});
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    (async () => {
      setAdv((await getAdvert(urlkey)));
      if (adv.geo?.let) {
        setCenter({lat: adv.geo[Object.keys(adv.geo)[1]], lng: adv.geo[Object.keys(adv.geo)[0]]});
      }
    })();
  }, [urlkey, center]);

  const statGarages = getStat(adv, 'garages');
  const statBedrooms = getStat(adv, 'bedrooms');
  const statBathrooms = getStat(adv, 'bathrooms');

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoPlay: true,
    autoplaySpeed: 1000,

  };

  return (
      <div className='container'>
        {adv &&
        <>
          <div className='row'>
            <div className='col-sm-12'>
              <h3>{adv.title}</h3>
              <small style={{fontSize: '12px', fontWeight: 'bold'}}>{adv.address?.province} > {adv.address?.city} > {adv.address?.suburb}</small><br/>


              <Slider {...settings}>
                {
                  adv.images && (
                      adv.images.map((img, i) => {
                        return (
                            <div key={i}>
                              <img src={img.url} className="card-img-bottom card-img-top" alt={adv.title} style={{maxHeight: '400px'}}/>
                            </div>
                        );
                      })
                  )
                }
              </Slider>

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
            <div className='col-xs-12 col-sm-7' style={{borderTop: '1px solid #000000'}}>
              <span dangerouslySetInnerHTML={{__html: adv.description}}></span>
            </div>
            <div className='col-xs-12 col-sm-4 offset-md-1 row' style={{fontSize: '13px', borderTop: '1px solid #000000'}}>
              <div className='col-md-12'>
                <h5>Technical Details</h5>
              </div>
              <div className='row-md-6 row-xs-12'>
                <ul style={{listStyle: 'none', textTransform: 'capitalize'}}>
                  {
                    (() => {
                      if (adv.stat?.count) {
                        return adv.stat.count.map((k, i) => {
                          const keyname = Object.keys(k)[0];
                          const val = k[keyname];
                          return <li key={i}>{val} {keyname.replace('_', ' ')} </li>;
                        });
                      }
                    })()
                  }
                  <li>&nbsp;</li>
                  {
                    (() => {
                      if (adv.stat?.size) {
                        return adv.stat.size.map((k) => {
                          const keyname = Object.keys(k)[0];
                          const val = k[keyname];
                          return <li>{keyname.replace('_', ' ')} {val}</li>;
                        });
                      }
                    })()
                  }
                </ul>
              </div>
              <div className='row-md-6 row-xs-12'>
                <ul style={{listStyle: 'none', textTransform: 'capitalize'}}>
                  {
                    (() => {
                      if (adv.stat?.size) {
                        return adv.stat.has.map((k) => {
                          const keyname = Object.keys(k)[0];
                          const val = k[keyname];
                          return <li>{val} {keyname.replace('_', ' ')} <i className='fa fa-check'/></li>;
                        });
                      }
                    })()
                  }
                </ul>
              </div>
            </div>
          </div>
          {
            adv.geo?.lat &&
            <div style={{height: '50vh', width: '100%'}}>
              <GoogleMapReact
                  bootstrapURLKeys={{key: MAP_KEY}}
                  defaultCenter={{lat: adv.geo[Object.keys(adv.geo)[1]], lng: adv.geo[Object.keys(adv.geo)[0]]}}
                  defaultZoom={zoom}
              >
                <MapMarker lat={adv.geo[Object.keys(adv.geo)[1]]} lng={adv.geo[Object.keys(adv.geo)[0]]} text=""></MapMarker>
              </GoogleMapReact>
            </div>
          }
          <hr/>
          <ContactForm id={adv.pk}/>
        </>
        }
      </div>
  );
}

export default View;
