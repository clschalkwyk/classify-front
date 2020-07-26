import React, {useState} from 'react';
import signinAction from '../lib/actions/signin';
import {useCookies} from 'react-cookie';

function Signin(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['token']);

  async function doSignup(e) {
    e.preventDefault();

    const params = {
      email,
      password,
    };
    const res = await signinAction(params);

    if(res.status === 201){
      const {access_token} = res.data;
      if(access_token !== undefined){
        setCookie('token', access_token, {path:'/'});
        window.location.href = '/';
      }
    }
  }

  return (
      <section className='p-4 d-flex justify-content-center border signupin-frm'>
        <form className='col-md-4' onSubmit={(e) => doSignup(e)}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">Email address</label>
            <input type="email" id="email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="row mb-4">
            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign In</button>
        </form>
      </section>
  );

}

export default Signin;