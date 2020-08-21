import React, {useEffect} from 'react';

function Submitter(props){

  useEffect(() => {
    console.log(props);

  });
  return (
    <span>
      Submitting
    </span>
  )
};

export default Submitter;
