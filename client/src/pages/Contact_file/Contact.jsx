import React from 'react';
import "./Contact.css"; 

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-header">Contact</h1>
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-info-block">
            <h2>E-mail</h2>
            <p>
              <a href="mailto:example@example.com">example@example.com</a>
            </p>
          </div>
          <div className="contact-info-block">
            <h2>Phone</h2>
            <p>
              <a href="tel:+11234567890">+1 123-456-7890</a>
            </p>
          </div>
          <div className="contact-info-block">
            <h2>Address</h2>
            <p>
              <a href="https://www.google.com/maps?q=123+Main+Street,+City,+Country" target="_blank" rel="noopener noreferrer">
                123 Main Street, City, Country
              </a>
            </p>
          </div>
        </div>
        <p className="contact-question"> If you want to give a question to us, please enter your text below
</p>
        <form className="contact-form">
          <label htmlFor="message">
            </label>
          <textarea id="message" name="message" placeholder="Your Message"></textarea>
          <button type="submit" className="contact-submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
