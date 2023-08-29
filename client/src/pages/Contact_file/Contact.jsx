import React from 'react';
import './Contact.css';

const Contact = () => {
  
  return (
    <div className='contactUs'> 
      <div className='title'>
        <h2>Get in touch</h2>
      </div>
      <div className='box'>
        <div className='contact form'>
          <h3>Send a Message</h3>
          <form action="https://formsubmit.co/f042a1bab4cd463d0c29046c2592aa64 " method="POST">
            <div className='formBox'>
              <div className='row50'>
                <div className='inputBox'>
                  <span>First Name</span>
                  <input type='text'  name = 'firstname'  placeholder='Enter your first name...' required></input>
                </div>
                <div className='inputBox'>
                  <span>Last Name</span>
                  <input type='text' name = 'lastname' placeholder='Enter your last name...' required></input>
                </div>
              </div>
              <div className='row50'>
                <div className='inputBox'>
                  <span>Email</span>
                  <input type='email'  name = 'email' placeholder='Enter your email...' required ></input>
                </div>
                <div className='inputBox'>
                  <span>Phone</span>
                  <input type='text' name ='phone' placeholder='Enter your phone...' required></input>
                </div>
              </div>
              <div className='row100'>
                <div className='inputBox'>
                  <span>Message</span>
                  <textarea name ='message' placeholder='Write your message here....' required></textarea>
                </div> 
              </div>
              <div className='row100'>
                <div className='inputBox'>
                  <input type='submit' value='Send'></input>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className='contact info'>
          <h3>Contact Info</h3>
          <div className='infoBox'>
            <div>
              <span><i className="fas fa-map-marker-alt"></i></span>
              <p>Kyiv, Ukraine</p>
            </div>
            <div>
              <span><i className="far fa-envelope"></i></span>
              <a href="mailto:example@gmail.com">example@gmail.com</a>
            </div>
            <div>
              <span><i className="fas fa-phone"></i></span>
              <a href='tel:+90899089080809'>+38000000000</a>
            </div>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d133911.47643675178!2d30.36467847926781!3d50.4244076038972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2z0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1693304994115!5m2!1sru!2sua"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
