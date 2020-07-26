import React, {useState} from 'react';

function Signup(props){
  console.log(props);
  const [email, setEmail] = useState('');

  return (
      <h3>Signup</h3>
  );
}

export default Signup;