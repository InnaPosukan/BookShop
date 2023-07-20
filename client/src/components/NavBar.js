import React, { useContext, useState } from 'react';
import { Context } from '../index';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user } = useContext(Context);
  const [basketHover, setBasketHover] = useState(false);
  const [loginHover, setLoginHover] = useState(false);

  const handleBasketHover = () => {
    setBasketHover(!basketHover);
  };

  const handleLoginHover = () => {
    setLoginHover(!loginHover);
  };

  const basketButtonStyle = {
    backgroundColor: basketHover ? '#FFC554' : '#FAA90C',
    marginRight: '10px',
    transition: 'background-color 0.3s',
    width: '70px',
  };

  const loginButtonStyle = {
    backgroundColor: loginHover ? '#FFC554' : '#FAA90C',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  };

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/shop" style={{ marginLeft: '-10px', padding: '0 30px' }}>
          <img src={logo} alt="Logo" className="d-inline-block align-text-top" style={{ transition: 'transform 0.3s' }} />
          <span className="ms-2" style={{ fontSize: '19px', transition: 'color 0.3s' }}>BookShop</span>
        </a>

        <div className="d-flex">
          <a href="/login" className="btn" style={basketButtonStyle} onMouseEnter={handleBasketHover} onMouseLeave={handleBasketHover}>Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
