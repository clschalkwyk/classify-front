import React, {useEffect, useState} from 'react';

function MyAds() {

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
      'country': '',
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
    "propertyType": ["house","apartment","townhouse","plot","farm","commercial_building","industrial"],
    "advertType": ["for_sale", "to_rent"]
  };

  const typeOptionList = (typeList) => {
      return typeList.map(lst => {
        return (
            <option value={lst} key={lst}>{lst.replace('_',' ')}</option>
        )
      });
  };
  const [propertyType, setPropertyType] = useState('');
  const [propTitle, setProptitle] = useState('');
  let adTitle = '';

  const recalcTitle = () => {
    if(propertyType !== ''){
      const bedroomCount = document.getElementById('stat.count.bedrooms').value;
      let adTitle=[];
      if(bedroomCount > 0){
        adTitle.push(`${bedroomCount} Bedroom`)
      }
      adTitle.push(propertyType)

      setProptitle(adTitle.join(" "))
    }

  }
  useEffect(() => {
    if(propertyType !== ''){
      const bedroomCount = document.getElementById('stat.count.bedrooms').value;
      let adTitle = [];

      if(bedroomCount > 0){
        adTitle.push(`${bedroomCount} Bedroom`)
      }
      adTitle.push(propertyType)

      setProptitle(adTitle.join(" "));
    }

  },[propertyType])

  return (
      <section>
        <form>
          {propTitle && <h5 style={{textTransform: "capitalize"}}>{propTitle}</h5>}
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Property Description </label>
              <textarea name="description" id="description" className="form-control" rows={5}></textarea>
            </div>
          </div>
          <hr/>
          <div className="form-row justify-content-center">
            <div className="form-group col-md-2">
              <label>Advert Type</label>
              <select className="proptype form-control">
                <option value="">Select...</option>
                {typeOptionList(lists.advertType)}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label>Property Type</label>
              <select className="proptype form-control" defaultValue={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">Select...</option>
                {typeOptionList(lists.propertyType)}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label>Asking Price</label>
              <input type="number" name="askingPrice" className="form-control"/>
            </div>

            <div className="form-group col-md-2">
              <label>Rates / Taxes</label>
              <input type="number" name="ratesTaxes" className="form-control"/>
            </div>


          </div>
          <hr/>
          <div className="row propstats">
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
          <div className="row propstats">
            {stats.Has.map(stat => {
              const lbl = stat.replace('_', ' ');
              return (
                  <div className="col-md-2" key={stat}>
                    <div className="form-group form-check-inline">
                      <input type="checkbox" className="form-check-input" id={`stat.has.${stat}`} data-stat="has"/>
                      <label className="form-check-label">{lbl}</label>
                    </div>
                  </div>
              );
            })}
          </div>
          <hr/>
          <div className="row propstats">
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
        </form>
      </section>
  );
}

export default MyAds;