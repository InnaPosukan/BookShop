import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Context } from '../index';
import logo from '../assets/logo.png';

const Navbar = observer(() => {
  const { user } = useContext(Context);
  const [basketHover, setBasketHover] = useState(false);

  const handleBasketHover = () => {
    setBasketHover(!basketHover);
  };
const logOut = () =>{
  user.setUser({})
  user.setIsAuth(false)
}
  const basketButtonStyle = {
    backgroundColor: basketHover ? '#FFC554' : '#FAA90C',
    marginRight: '10px',
    transition: 'background-color 0.3s',
    width: '70px',
  };

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ marginLeft: '-10px', padding: '0 30px' }}>
          <img src={logo} alt="Logo" className="d-inline-block align-text-top" style={{ transition: 'transform 0.3s' }} />
          <span className="ms-2" style={{ fontSize: '19px', transition: 'color 0.3s' }}>BookShop</span>
        </Link>

        <div className="d-flex">
          <Link to="/shop" className="btn" style={basketButtonStyle} onMouseEnter={handleBasketHover} onMouseLeave={handleBasketHover}>
            Shop
          </Link>
        </div>
        <div className="d-flex">
          {user.isAuth ? (
            <button className="btn" style={basketButtonStyle} onClick={() => logOut()}>
              Log out
            </button>
          ) : (
            <Link to="/login" className="btn" style={basketButtonStyle} onMouseEnter={handleBasketHover} onMouseLeave={handleBasketHover}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
