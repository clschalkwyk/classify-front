import React, {useState} from 'react';
import signupAction from '../lib/actions/signup';

function Signup(){

  async function doSignup(e) {
    e.preventDefault();

    const frm = {
      email, password, confirmpassword
    }
    const result = await signupAction(frm);
    if(result?.email !== ''){
      window.location = '/';
    }
  }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    return (
        <section className='p-4 d-flex justify-content-center border signupin-frm'>
          <form onSubmit={(e) => doSignup(e)} className='col-md-4'>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
                <small id="emailHelp" className="form-text text-muted">We'll  never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control"  id="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input type="password" className="form-control"  id="confirmpassword" onChange={(e) => setConfirmpassword(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary form-control">Join Now!</button>
          </form>
        </section>
    );

}

export default Signup;