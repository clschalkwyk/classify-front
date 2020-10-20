import React, {useEffect, useState} from 'react';
import AdvertCard from './components/AdvertCard';
import {feedByAdvPt} from '../lib/actions/feed';
import Filterbar from './components/Filterbar';
import GoogleMapReact from 'google-map-react';
import theLists from '../config/lists';
import './Home.scss';

const MapMarker = ({text, id}) => <div className='pin' data-id={id}>{text}</div>;

function Home() {
  const [provList, setProvList] = useState([]);
//feedByProvPt, feedByProvince,
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

  const markers = [
    {
      'pk': 'b47acd6a-32ba-47b7-a5af-b463d2dda52d',
      'advert': {'askingPrice': '595000', 'statCount': {'bedrooms': '1', 'bathrooms': '1', 'open_parkings': '1', 'en-suite': '1', 'lounges': '1'}, 'title': '1 Bed Apartment in Tableview', 'advertType': 'For Sale', 'propertyType': 'Apartment'},
      'data': [{'geometry': {'location': {'lng': 18.5179525, 'lat': -33.8234431}}, 'place_id': 'ChIJ_exhRdtfzB0RlMiex4xadmA'}],
    },
    {
      'pk': 'c751b673-be87-4ced-b3d9-3dd9d51e485b',
      'advert': {'askingPrice': '6995000', 'statCount': {'bedrooms': '4', 'garages': '2', 'open_parkings': '2', 'lounges': '2', 'storeys': '2', 'bathrooms': '4', 'dining_areas': '1', 'en-suite': '1'}, 'title': '4 Bed House in Bloubergstrand', 'advertType': 'For Sale', 'propertyType': 'House'},
      'data': [{'geometry': {'location': {'lng': 18.467735, 'lat': -33.8059989}}, 'place_id': 'ChIJRzfAoYZfzB0RGIVQTsYfv5w'}],
    },
    {
      'pk': 'd3aa5b30-7d5a-4240-8b17-00ce4a9ff7ad',
      'advert': {'askingPrice': '5799000', 'statCount': {'bedrooms': '3', 'bathrooms': '2', 'covered_parkings': '2', 'dining_areas': '1', 'en-suite': '1', 'lounges': '1'}, 'title': '3 Bed Apartment in Bloubergstrand', 'advertType': 'For Sale', 'propertyType': 'Apartment'},
      'data': [{'geometry': {'location': {'lng': 18.4865663, 'lat': -33.8194491}}, 'place_id': 'ChIJW_h5kt9ezB0RtU42aTYIpy0'}],
    },
    {
      'pk': 'ec42f37e-af43-41a4-b1a7-da62f6a55e80',
      'advert': {'askingPrice': '1950000', 'statCount': {'bedrooms': '2', 'open_parkings': '2', 'lounges': '1', 'storeys': '2', 'bathrooms': '2', 'dining_areas': '1', 'en-suite': '1'}, 'title': '2 Bed Apartment in Big Bay', 'advertType': 'For Sale', 'propertyType': 'Apartment'},
      'data': [{'geometry': {'location': {'lng': 18.4572375, 'lat': -33.788546}}, 'place_id': 'ChIJISJhC7JXzB0RbrpWxDHlNWg'}],
    },
    {
      'pk': 'f2bd52bf-b5af-48f9-ab89-e4bfa1be5e7d',
      'advert': {'askingPrice': '1575000', 'statCount': {'bedrooms': '2', 'garages': '1', 'bathrooms': '1', 'open_parkings': '1', 'lounges': '1'}, 'title': '2 Bed House in Tableview', 'advertType': 'For Sale', 'propertyType': 'House'},
      'data': [{'geometry': {'location': {'lng': 18.5132793, 'lat': -33.8386464}}, 'place_id': 'ChIJp83ps9dezB0RvIZjWWejPKw'}],
    },

  ];
  const MAP_KEY = 'AIzaSyAc_llDV6vAELqGORE0uH5D11UFUNMTKOU';
  console.log(window.innerHeight);
  return (
      <>
        {/*<Filterbar/>*/}
        <div className='container-fluid'>
          <div className={'row'}>
            <div className='col-md-3'>
              {/*{adRows}*/}
              <form>
                <label><strong>Advert Type</strong></label>
                <div className='form-group'>
                  <div className='row' style={{padding: '10px'}}>
                    {theLists.advertType.map((pt) => {
                      return (
                          <div className='form-group form-check col-sm-4'>
                            <input type='checkbox' name='advertType' className="form-check-input" value={pt}/>
                            <label className='form-check-label'>{pt}</label>
                          </div>

                      );
                    })}
                  </div>
                </div>
                <label><strong>Property Type</strong></label>
                <div className='form-group'>
                  <div className='row' style={{padding: '10px'}}>
                    {theLists.propertyType.map((pt) => {
                      return (
                          <div className='form-group form-check col-sm-4'>
                            <input type='checkbox' name='propertyType' className="form-check-input" value={pt}/>
                            <label className='form-check-label'>{pt}</label>
                          </div>
                      );
                    })}
                  </div>
                </div>
                <label><strong>Rooms</strong></label>
                <div className='row' style={{padding: '10px'}}>
                  {theLists.filterStats.Count.map(stat => {
                    const lbl = stat.replace('_', ' ');
                    return (
                        <div className="form-group col-sm-6" key={stat}>
                          <label>{lbl.toString()}</label> <br/>
                          <div className="number-input">
                            <button onClick={(event) => {
                              document.getElementById(`stat.count.${stat}`).stepDown();
                              if (document.getElementById(`stat.count.${stat}`).value < 0) {
                                document.getElementById(`stat.count.${stat}`).value = 0;
                              }
                            }} type='button'></button>
                            <input type="number" className="input-small"
                                   placeholder='0'
                                   id={`stat.count.${stat}`}
                                   inputMode='numeric'
                                   maxLength={3}
                                   data-stat="count"/>
                            <button onClick={(event) => {
                              document.getElementById(`stat.count.${stat}`).stepUp(); //event.target.value = event.target.value + 1;
                              if (document.getElementById(`stat.count.${stat}`).value < 0) {
                                document.getElementById(`stat.count.${stat}`).value = 0;
                              }
                            }} className="plus" type='button'></button>
                          </div>
                        </div>
                    );
                  })}
                </div>
                <label><strong>Features</strong></label>
                <div className='row' style={{padding: '10px'}}>
                  {theLists.filterStats.Has.map(stat => {
                    const lbl = stat.replace('_', ' ');
                    return (
                        <div className='form-group form-check col-sm-4'>
                          <input type="checkbox" className="form-check-input" placeholder={lbl} id={`stat.has.${stat}`} data-stat="count"/>
                          <label className='form-check-label'>{lbl.toString()}</label>
                        </div>
                    );
                  })}

                </div>


              </form>
            </div>
            <div className='col-md-9'>
              <div style={{height: '840px', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: MAP_KEY}}
                    defaultCenter={{lat: -28.7, lng: 23}}
                    defaultZoom={6}
                >
                  {
                    markers.map((mp) => {
                      const geo = mp.data.pop();
                      return <MapMarker lat={geo.geometry.location.lat} lng={geo.geometry.location.lng} text="" id={mp.pk}></MapMarker>;
                    })
                  }
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div>
        {/*<div className='row' style={{padding: '16px'}}>*/}
        {/*</div>*/}
      </>
  );
}

export default Home;
