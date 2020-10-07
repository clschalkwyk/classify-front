import React, {useEffect, useState} from 'react';
import './NewAd.css';
import {v4 as uuid4} from 'uuid';
import axiosApi from '../../lib/actions/endpoint';
import genPayload from '../../lib/myaccount/genpayload';
import CreateAd from '../../lib/actions/createAd';
import uploadFile from '../../lib/actions/uploadFile';
import deleteFile from '../../lib/actions/deleteFile';
import theLists from '../../config/lists';

function NewAd() {

  const advert = {
    'id': '',
    'type': 'property',
    'title': '',
    'description': '',
    'images': '',
    'createdAt': '',
    'expiredAt': '',
    'published': '',
    'stats': {
      'Count': {},
      'Has': {},
      'Size': {},
    },
    'ratesTaxes': '',
    'askingPrice': '',
    'rentalAmount': '',
    'propertyType': '',
    'geoLocation': {
      'lat': '',
      'lon': '',
    },
    'user_id': '',
    'fullAddress': {
      'buildingName': '',
      'complexName': '',
      'street1': '',
      'street2': '',
      'suburb': '',
      'postcode': '',
      'city': '',
      'province': '',
      'country': 'ZA',
    },
  };

  const stats = {
    'Count': [
      'bedrooms',
      'bathrooms',
      'lounges',
      'kitchen',
      'garage',
      'parking_bays',
    ],
    'Has': [
      'pool',
      'patio',
      'storage',
      'laundry',
      'scullery',
      'guest_toilet',
      'entrance_hall',
      'alarm',
      'access_gate',
      'electric_fencing',
      'intercom',
      'guard_house',
      'pet_friendly',
      'sea_view',
      'flatlet',
    ],
    'Size': [
      'erf_size',
      'floor_area',
    ],
  };


  // const lists = {
  //   'propertyType': ['House', 'Apartment', 'Townhouse', 'Plot', 'Farm', 'Commercial Building', 'Industrial'],
  //   'advertType': ['For Sale', 'To Rent'],
  //   'province': [
  //     'Eeastern  Cape',
  //     'Free State',
  //     'Kwazulu-Natal',
  //     'Gauteng',
  //     'Limpopo',
  //     'Mpumalanga',
  //     'North-West',
  //     'Western Cape',
  //   ],
  // };

  const typeOptionList = (typeList) => {
    return typeList.map(lst => {
      return (
          <option value={lst} key={lst}>{lst.replace('_', ' ')}</option>
      );
    });
  };
  const [propertyType, setPropertyType] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [propTitle, setProptitle] = useState('');
  const [advertType, setAdvertType] = useState('');
  const [tmpid, setTmpid] = useState('');
  const [gallery, setGallery] = useState([]);

  const reloadGallery = () => {

    (async () => {
      if (localStorage.getItem('tmpId')) {
        const res = await axiosApi.get(`advert/images/temp/${localStorage.getItem('tmpId')}`);
        if (res.data?.result) {
          let galleryUpdate = Array(res.data.result.length);
          res.data.result.map((it) => {
            galleryUpdate[parseInt(it.position)] = it;
          });
          setGallery(galleryUpdate);

          console.log('updated gallery');
        }
      }
    })();
  };

  useEffect(() => {
    if (!localStorage.getItem('tmpId')) {
      localStorage.setItem('tmpId', uuid4());
    }
    setTmpid(localStorage.getItem('tmpId'));
    reloadGallery();
  }, []);

  let galleryDisplay;
  useEffect(() => {
    if (!localStorage.getItem('tmpId')) {
      localStorage.setItem('tmpId', uuid4());
    }
    setTmpid(localStorage.getItem('tmpId'));
  }, [gallery]);

  let imagePos = 0;

  const recalcTitle = () => {
    if (propertyType !== '') {
      const bedroomCount = document.getElementById('stat.count.bedrooms').value;

      let adTitle = [];
      if (bedroomCount > 0) {
        adTitle.push(`${bedroomCount} Bedroom`);
      }
      adTitle.push(propertyType);

      if (advertType) {
        adTitle.push(advertType);
      }

      if (city !== '') {
        adTitle.push(`in ${city}`);
      }

      if (province !== '') {
        adTitle.push(`, ${province}`);
      }

      setProptitle(adTitle.join(' '));
    }

  };

  useEffect(() => {
    if (propertyType !== '') {
      const bedroomCount = document.getElementById('stat.count.bedrooms').value;
      let adTitle = [];

      if (bedroomCount > 0) {
        adTitle.push(`${bedroomCount} Bedroom`);
      }
      adTitle.push(propertyType);

      if (advertType) {
        adTitle.push(advertType);
      }

      if (city !== '') {
        adTitle.push(`in ${city}`);
      }

      if (province !== '') {
        adTitle.push(`, ${province}`);
      }
      setProptitle(adTitle.join(' '));
    }

  }, [propertyType, city, province, advertType]);

  async function sendIt(event) {
    event.preventDefault();

    let pload = genPayload();
    pload['title'] = propTitle;

    const res = await CreateAd(pload);
    if (res.pk){
      localStorage.removeItem('tmpId');
      window.location.href = '/my-account';
    }

  }

  return (
      <section>
        <form className="propstats" onSubmit={(e) => {
          sendIt(e);
        }}>
          <input type="hidden" id="tmpId" name="tmpId" value={tmpid}/>
          <input type="hidden" id="type" name="type" value="property"/>
          {propTitle && <h5 style={{textTransform: 'capitalize'}}>{propTitle}</h5>}

          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Property Description </label>
              <textarea name="description" id="description" className="form-control" rows={5}/>
            </div>
          </div>
          <hr/>
          <div className="form-row justify-content-center ">
            <div className="form-group col-md-3">
              <label>Advert Type</label>
              <select className="proptype form-control" name="advert_type" id="advertType" defaultValue={advertType} onChange={(e) => setAdvertType(e.target.value)}>
                <option value="">Select...</option>
                {typeOptionList(theLists.advertType)}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>Property Type</label>
              <select id="propertyType" className="proptype form-control" defaultValue={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">Select...</option>
                {typeOptionList(theLists.propertyType)}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>Asking Price</label>
              <input type="number" name="askingPrice" id="askingPrice" className="form-control"/>
            </div>
            <div className="form-group col-md-3">
              <label>Rates / Taxes</label>
              <input type="number" name="ratesTaxes" id="ratesTaxes" className="form-control"/>
            </div>
          </div>
          <hr/>
          <div className="row ad-stats">
            {stats.Count.map(stat => {
              const lbl = stat.replace('_', ' ');
              return (
                  <div className="col-xs-6 col-sm-4 col-md-4 col-6" key={stat}>
                    <div className="form-group input-group-sm">
                      <label>{lbl}</label>
                      <input type="number" className="form-control "
                             placeholder={lbl}
                             id={`stat.count.${stat}`}
                             data-stat="count" onChange={(e) => {
                        recalcTitle();
                      }}/>
                    </div>
                  </div>
              );
            })}
          </div>
          <hr/>
          <small>Select only applicable options.</small>
          <div className="row ad-stats">
            {stats.Has.map(stat => {
              const lbl = stat.replace('_', ' ');
              return (
                  <div className="col-xs-6 col-sm-4 col-md-4 col-6" key={stat}>
                    <div className="form-group form-check-inline">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" id={`stat.has.${stat}`} data-stat="has"/>
                        {lbl}</label>
                    </div>
                  </div>
              );
            })}
          </div>
          <hr/>
          <div className="row ">
            {stats.Size.map(stat => {
              const lbl = stat.replace('_', ' ');
              return (
                  <div className="col-xs-6 col-sm-4 col-md-4 col-6" key={stat}>
                    <label>{lbl}</label>
                    <div className="input-group input-group-sm">
                      <input type="number" className="form-control " placeholder={lbl} id={`stat.size.${stat}`} data-stat="size"/>
                      <div className="input-group-append">
                        <div className="input-group-text"><sup>2</sup>m</div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
          <hr/>
          <div className="form-row ">
            <div className="form-group col-md-6">
              <label htmlFor="buildingName">Building Name</label>
              <input type="text" name="buildingName" id="buildingName" className="form-control" maxLength="60"/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="complexName">Complex Name</label>
              <input type="text" name="complexName" id="complexName" className="form-control" maxLength="60"/>
            </div>
          </div>
          <div className="form-row ">
            <div className="form-group col-md-4">
              <label htmlFor="street1">Street</label>
              <input type="text" name="street1" id="street1" className="form-control" maxLength="60"/>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="street2">Street 2</label>
              <input type="text" name="street2" id="street2" className="form-control" maxLength="60"/>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="suburb">Suburb</label>
              <input type="text" name="suburb" id="suburb" className="form-control" maxLength="60"/>
            </div>
          </div>
          <div className="form-row ">
            <div className="form-group col-md-3">
              <label htmlFor="city">City</label>
              <input type="text" name="city" id="city" className="form-control" maxLength="60" value={city} onChange={(e) => setCity(e.target.value)}/>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="postcode">Postcode</label>
              <input type="number" name="postcode" id="postcode" className="form-control" maxLength="10"/>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="province">Province</label>

              <select id="province" name="province" className="form-control" style={{textTransform: 'capitalize'}}
                      onChange={(e) => setProvince(e.target.value)} defaultValue={province}>
                <option defaultValue={province}>Select...</option>
                {theLists.province.map((lst) => {

                  return (
                      <option value={lst} key={lst}>{lst.replace('_', ' ')}</option>
                  );
                })}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="country">Country</label>
              <select name="country" id="country" className="form-control" defaultValue={advert.fullAddress.country}>
                <option value="">Select...</option>
                <option value="ZA">South Africa</option>
              </select>
            </div>
          </div>
          <hr/>
          <small>Select an image below to upload</small><br/>
          <input type="file" name="image" id="image" onChange={
            (e) => {
              uploadFile(e, tmpid, gallery, setGallery, gallery.length + 1);
            }
          }/>
          <hr/>
          <div className="row">
            {
              gallery && gallery.map((img, i) => {
                if (img?.url) {
                  return (
                      <div className='col-md-3 gallery' style={{marginTop: '10px'}} key={i} id={`IMG-${img.pk}`}>
                        <img src={img?.url}/>
                        <small className='badge badge-pill badge-danger' onClick={
                          (e) => {
                            if (window.confirm("Are you sure?")) {
                              console.log("remove: ", img?.pk);
                              const r = deleteFile(tmpid, img.pk);
                              console.log("Deleted : ", r);
                              document.getElementById(`IMG-${img.pk}`).remove();
                            }
                          }}>remove</small>
                      </div>);
                }
              })
            }
          </div>
          <hr/>

          <button className="btn btn-primary form-control">Post Advert</button>
        </form>
      </section>
  );
}

export default NewAd;
