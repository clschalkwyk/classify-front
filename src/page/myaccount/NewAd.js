import React, {useEffect, useState} from 'react';
import genPayload from '../../lib/myaccount/genpayload';
import CreateAd from '../../lib/actions/createAd';

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

  const lists = {
    'propertyType': ['House', 'Apartment', 'Townhouse', 'Plot', 'Farm', 'Commercial Building', 'Industrial'],
    'advertType': ['For Sale', 'To Rent'],
    'province': [
      'Eeastern  Cape',
      'Free State',
      'Kwazulu-Natal',
      'Gauteng',
      'Limpopo',
      'Mpumalanga',
      'North-West',
      'Western Cape'
    ],
  };

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

  let adTitle = '';

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


   async function sendIt (event) {
    event.preventDefault();

    let pload = genPayload();
    pload['title'] = propTitle;

    console.log('Payload: ', JSON.stringify(pload));
    const res = await CreateAd(pload);
    console.log(res);
  }

  return (
      <section>
        <form className="propstats" onSubmit={(e) => {
          sendIt(e);
        }}>
          <input type="hidden" id="type" name="type" value="property"/>
          {propTitle && <h5 style={{textTransform: 'capitalize'}}>{propTitle}</h5>}
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Property Description </label>
              <textarea name="description" id="description" className="form-control" rows={5} />
            </div>
          </div>
          <hr/>
          <div className="form-row justify-content-center ">
            <div className="form-group col-md-2">
              <label>Advert Type</label>
              <select className="proptype form-control" name="advert_type" id="advertType" defaultValue={advertType} onChange={(e) => setAdvertType(e.target.value)}>
                <option value="">Select...</option>
                {typeOptionList(lists.advertType)}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label>Property Type</label>
              <select id="propertyType" className="proptype form-control" defaultValue={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">Select...</option>
                {typeOptionList(lists.propertyType)}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label>Asking Price</label>
              <input type="number" name="askingPrice" id="askingPrice" className="form-control"/>
            </div>
            <div className="form-group col-md-2">
              <label>Rates / Taxes</label>
              <input type="number" name="ratesTaxes" id="ratesTaxes" className="form-control"/>
            </div>
          </div>
          <hr/>
          <div className="row ">
            {stats.Count.map(stat => {
              const lbl = stat.replace('_', ' ');
              return (
                  <div className="col-md-2" key={stat}>
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
          <div className="row ">
            {stats.Has.map(stat => {
              const lbl = stat.replace('_', ' ');
              return (
                  <div className="col-md-2" key={stat}>
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
                  <div className="col-md-3" key={stat}>
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
                {lists.province.map((lst) => {

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
          <button className="btn btn-primary form-control">Post Advert</button>
        </form>
      </section>
  );
}

export default NewAd;