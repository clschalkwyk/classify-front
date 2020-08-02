import React from 'react';

function AdvertCard(props){
  return (
      <div className="card m-2 flex-fill" style={{width: '18rem'}}>
        <img src='http://lorempixel.com/400/200/city/' className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title" style={{fontSize:'14px'}}>Sunningdale, Cape Town</h5>
          <p className="card-text" style={{fontSize:'14px'}}>Some quick example text to build on the
            card title and make up the bulk of the card's content.</p>

        </div>
      </div>
  )
}

export default AdvertCard;