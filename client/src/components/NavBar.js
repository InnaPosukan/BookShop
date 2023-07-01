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
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/" style={{ marginLeft: '-10px', padding: '0 30px' }}>
          <img src={logo} alt="Logo" className="d-inline-block align-text-top" style={{ transition: 'transform 0.3s' }} />
          <span className="ms-2" style={{ fontSize: '19px', transition: 'color 0.3s' }}>BookShop</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex">
          <button className="btn" style={basketButtonStyle} onMouseEnter={handleBasketHover} onMouseLeave={handleBasketHover}>Сart</button>
          <button className="btn" style={loginButtonStyle} onMouseEnter={handleLoginHover} onMouseLeave={handleLoginHover}>Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
