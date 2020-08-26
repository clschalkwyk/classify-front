import React, {useState} from 'react';
import './ContactForm.scss';
import SendMessage from '../../lib/actions/sendMessage';

function ContactForm(props) {

  const [showForm, setShowForm] = useState(true);
  const {id} = props;
  const [messageForm, setMessageForm] = useState('');
  const [showGetInTouch, setShowGetInTouch] = useState(false);

  window.submitter = (ctnFrm) => {
    (async () => {
      if (ctnFrm.consent) {
        const advertMessage = {...ctnFrm, advert: id};
        const result = await SendMessage(advertMessage);

        if(result.result === "ok"){
          setShowForm(false);
        }
      } else {
        //console.log('Not consented');
      }
    })()
  };

  const contactForm = (
            <div className='row contactForm'>
              <div className='col-sm-12'>
                <form onSubmit={window.submitcontactform}>
                  <div className='row'>
                    <div className="col-sm-6 cols-xs-12 col">
                      <div className="form-group col-sm-12">
                        <label htmlFor="firstname">Firstname</label>
                        <input type="text" className="form-control cnt-frm" id="firstname" placeholder="Firstname" required='required'/>
                      </div>
                      <div className="form-group col-md-12 col-sm-6 col-xs-6">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control cnt-frm" id="email" placeholder='hello@mail.me'  required='required'/>
                      </div>

                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div className="form-group col-sm-12">
                        <label htmlFor="lastname">Lastname</label>
                        <input type="text" className="form-control cnt-frm" id="lastname" placeholder="Lastname" required='required'/>
                      </div>

                      <div className="form-group col-md-12 col-sm-6 col-xs-6">
                        <label htmlFor="telephone">Telephone</label>
                        <input type="telephone" className="form-control cnt-frm" id="telephone" placeholder='021 123 4567'  required='required'/>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="form-group col-sm-12">
                        <label htmlFor="message">Message*</label>
                        <textarea rows={4}
                                  className='form-control cnt-frm'
                                  id='message'
                                  defaultValue={messageForm}
                                  onChange={(e) => setMessageForm(e.target.value)}
                                  placeholder='Please leave your name and number and the advertiser will get back to you.'
                                  maxLength={400}
                                  required='required'/>
                                  <span className='small'>{messageForm.length} of 400</span>
                      </div>
                    </div>
                  </div>
                  <div className='row justify-content-center'>
                    <div className='col'>
                      <div className="form-check">
                        <label><input type='checkbox' style={{fontSize: '20px',marginRight: '10px'}} value={1} className='cnt-frm' id='consent'/> Yes, I agree to the use of my data to send this message.</label>
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

    return showForm ? (
        <>
            <div className='row justify-content-center touchbanner'>
              <button type='button' className='btn btn-link' onClick={(e) => {
                e.preventDefault();
                setShowGetInTouch(!showGetInTouch)}
              }>Click here to get in touch</button>
            </div>
            {showGetInTouch && contactForm}
        </>
    ): thankYouForm;

}

export default ContactForm;
