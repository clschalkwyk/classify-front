import React, {useEffect, useState} from 'react';
import Submitter from './Submitter';

function doSend(js) {
  console.log(js);
}

function ContactForm() {

  const [showForm, setShowForm] = useState(true);

  window.submitter = (ctnFrm) => {

    if (ctnFrm.consent) {
      console.log('Consented', ctnFrm);
      setShowForm(false);
    } else {
      console.log('Not consented');
    }
  };


  const contactForm = (
          <div className='row contactForm'>
          <div className='col-sm-12'>
            <form onSubmit={window.submitcontactform}>
              <div className='row justify-content-center touchbanner'>
                Get In Touch
              </div>
              <div className='row'>
                <div className="col-sm-6 cols-xs-12 col">
                  <div className="form-group col-sm-12">
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" className="form-control cnt-frm" id="firstname" placeholder="Firstname"/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" className="form-control cnt-frm" id="lastname" placeholder="Lastname"/>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="form-group col-md-12 col-sm-6 col-xs-6">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control cnt-frm" id="email" placeholder='hello@mail.me'/>
                  </div>
                  <div className="form-group col-md-12 col-sm-6 col-xs-6">
                    <label htmlFor="telephone">Telephone</label>
                    <input type="telephone" className="form-control cnt-frm" id="telephone" placeholder='021 123 4567'/>
                  </div>
                </div>

                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group col-sm-12">
                    <label htmlFor="message">Message*</label>
                    <textarea rows={5} className='form-control cnt-frm' id='message' placeholder='Please leave your name and number and the advertiser will get back to you.'></textarea>
                  </div>
                </div>
              </div>
              <div className='row justify-content-center'>
                <div className='col'>
                  <div className="form-check">
                    <label><input type='checkbox' style={{fontSize: '20px'}} value={1} className='cnt-frm' id='consent'/> Yes, I agree to the use of my data to send this message.</label>
                  </div>
                </div>
                <div className='col'>
                  <button className='btn btn-primary'>Send <i className='fa fa-envelope'/></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );

  const thankYouForm = (
      <div className='row contactForm'>
        <div className='col-sm-12'>
            <div className='row justify-content-center touchbanner'>
              Thank you, the advertiser will contact you as soon as possible.
            </div>
        </div>
      </div>
  );
  return showForm ? contactForm : thankYouForm;
}

export default ContactForm;
