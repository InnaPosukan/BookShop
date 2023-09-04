import React from 'react';
import './Footer.css'; // Импортируем файл стилей

const Footer = () => {
  return (
    <footer className="footer bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p style={{ textAlign: "left" }}>    Welcome to BookShop! We are passionate about books and believe in the power of literature to inspire, educate, and entertain. Our mission is to provide book lovers with a wide selection of books across various genres.</p>
          </div>
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: info@example.com</li>
              <li>Phone: +1234567890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
            <p style={{ textAlign: "right" }}>&copy; {new Date().getFullYear()} Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
