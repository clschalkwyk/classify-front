import React, {useEffect, useState} from 'react';
import InputText from '../components/InputText';
import InputLabel from '../components/InputLabel';
import InputCheckbox from '../components/InputCheckbox';
import {getProfile, updateProfile} from '../../lib/myaccount/account';

function AboutMe() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [newpass, setNewpass] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProfile();
      setEmail(res.data.email);
      setNewsletter(res.data.newsletter);
      setFirstname(res.data.firstname);
      setLastname(res.data.lastname);
    })();
  }, []);

  const sendIt = (e) => {
    e.preventDefault();

    (async () => {
      const frm = {
        firstname,
        lastname,
        newpass,
        confirmpass,
        newsletter,
      };

      if (frm.newpass !== '' && frm.confirmpass !== '') {
        if (frm.newpass !== frm.confirmpass) {
          throw new DOMException('Password not matching');
        }
      }
      const res = await updateProfile(frm);
      console.log('update profile',res);
    })();
  };

  return (
      <section className='d-flex '>
        <form className='col-md-12 list-group-horizontal' onSubmit={(e) => sendIt(e)}>
          <InputText id='firstname' name='firstname' label='First Name' value={firstname} change={setFirstname}/>
          <InputText id='lastname' name='lastname' label='Last Name' value={lastname} change={setLastname}/>
          <InputLabel id='email' name='email' label='Email Address' value={email}/>
          <InputText id='password' name='password' label='New Password' value={newpass} change={setNewpass} type="password"/>
          <InputText id='confirmpassword' name='confirmpassword' label='Confirm Password' value={confirmpass} change={setConfirmpass} type="password"/>
          <InputCheckbox id='newsletter' name='newsletter' label='Newsletter' value={newsletter} change={setNewsletter}/>
          <button type="submit" className="btn btn-danger btn-block">Update</button>
        </form>
      </section>
  );
}

export default AboutMe;
