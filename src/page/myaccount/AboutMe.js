import React, {useState} from 'react';
import InputText from '../components/InputText';
import InputLabel from '../components/InputLabel';
import InputCheckbox from '../components/InputCheckbox';


function AboutMe() {

const userData = {
  "id": "sdfsdf345345sfsdgf",
  "firstname": "Wikus",
  "lastname": "Schalkwyk",
  "email": "clschalkwyk@gmail.com",
  "createdAt": "2020-01-01 00:00:00",
  "updatedAt": "2020-01-01 00:00:00",
  "authId": "1",
  "newsletter": "0"
};
  const [firstname, setFirstname] = useState(userData.firstname);
  const [lastname, setLastname] = useState(userData.lastname);
  const [email, ] = useState(userData.email);
  const [newpass, setNewpass] = useState('');
  const [newsletter, setNewsletter] = useState(userData.newsletter);


  const sendIt = (e) => {
    e.preventDefault();
    const frm = {
      firstname,
      lastname,
      newpass,
      newsletter
    };
    console.log(frm);
  };

  return (
      <section className='d-flex '>
        <form className='col-md-12 list-group-horizontal' onSubmit={(e) => sendIt(e)}>
          <InputText id='firstname' name='firstname' label='First Name' value={firstname} change={setFirstname}/>
          <InputText id='lastname' name='lastname' label='Last Name' value={lastname} change={setLastname}/>
          <InputLabel id='email' name='email' label='Email Address' value={email} />
          <InputText id='password' name='password' label='New Password' value={newpass} change={setNewpass} type="password"/>
          <InputCheckbox id='newsletter' name='newsletter' label='Newsletter' value={newsletter} change={setNewsletter}/>
          <button type="submit" className="btn btn-danger btn-block">Update</button>
        </form>
      </section>
  );
}

export default AboutMe;