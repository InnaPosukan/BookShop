import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-light" style={{ position: "fixed", left: 0, bottom: 0, width: "100%", boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h5>About Us</h5>
            <p style={{ textAlign: "left" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada tellus eu nulla malesuada, vel efficitur est tincidunt.</p>
          </div>
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: info@example.com</li>
              <li>Phone: +1234567890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
            <p style={{ textAlign: "right" }}>&copy; {new Date().getFullYear()}  Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
