import React from 'react';

function AdvertCard(props) {

  const {item} = props;

  const getStat = (st) => {
    if(item.stat?.count) {
      return (item.stat.count.filter((it) => {
        return it.attrib === st
      })).map((i) => {
        return i.val
      }).pop()
    }
  };
  const beds = getStat('bedrooms');
  const baths = getStat('bathrooms');
  const garage = getStat('garages');
  const {askingPrice} = item;


  return (
      <div className="col-sm-6 col-md-6 col-lg-4 ad-box clickable" style={{marginTop: '10px'}} >
        <a href={`/property/view/${item.pk}`}>
        <img src="http://lorempixel.com/540/260/city/" className="card-img-bottom" alt={item.title} />
        <div className="info-box">
          <div className="row">
              <div className="col-xs-12">
                <h2>{item.title}</h2>
              </div>
          </div>
          <div className="row">
            {
              (beds &&
                  <div className="col-xs-2">
                    <h2>{beds}<i className="fa fa-bed"/></h2>
                  </div>
              )
            }
            {
              (baths &&
                  <div className="col-xs-2">
                    <h2>{baths}<i className="fa fa-bath"/></h2>
                  </div>
              )
            }
            {
              (garage &&
                  <div className="col-xs-2">
                    <h2>{garage}<i className="fa fa-car"/></h2>
                  </div>
              )
            }
            <div className="col">
              <div className="col-xs-2 float-right">
                <h2>R {new Intl.NumberFormat('en-ZA', {maximumSignificantDigits: 3}).format(askingPrice)}</h2>
              </div>
            </div>
          </div>
        </div>
        </a>
      </div>
  );
}

export default AdvertCard;
