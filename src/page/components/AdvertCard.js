import React from 'react';

function AdvertCard(props) {

  const {item} = props;

  let bedrooms;
  try{
    bedrooms =  item.stat.count.filter((e) => Object.keys(e)[0] === 'bedrooms').pop()['bedrooms'];
    }catch(e){ }

  let bathrooms;
  try{
    bathrooms =  item.stat.count.filter((e) => Object.keys(e)[0] === 'bathrooms').pop()['bathrooms'];
    }catch(e){ }

  let garages;
  try{
    garages =  item.stat.count.filter((e) => Object.keys(e)[0] === 'garages').pop()['garages'];
    }catch(e){ }

  const beds = bedrooms;
  const baths = bathrooms;
  const garage = garages;
  const {askingPrice} = item;


  return (
      <div className=" col-md-3 ad-box clickable" style={{padding: '10px'}} >
        <a href={`/property/view/${item.pk}`}>
        <img src="https://picsum.photos/799/460?grayscale" className="card-img-bottom" alt={item.title} />
        <div className="info-box">
          <div className="row">
              <div className="col-xs-12">
                <h2>{item.title}, <strong>{item.address.province}</strong></h2>
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
