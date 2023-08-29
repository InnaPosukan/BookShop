import React, { useContext, useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './NavBar.css';
import { Context } from '../..';
import { useSearch } from '../Context/searchContext';
import { useBasket } from '../Context/BasketContext';
import { Link } from 'react-router-dom';
import { decode as jwt_decode } from 'jsonwebtoken';

const NavBar = () => {
  const { user } = useContext(Context);
  const [isLogoutVisible, setIsLogoutVisible] = useState(user.isAuth);
  const { searchQuery, setSearchQuery } = useSearch();
  const { totalItems, setTotalItems } = useBasket();

  console.log('Total items in NavBar:', totalItems);

  useEffect(() => {
    const savedTotalItems = localStorage.getItem('totalItems');
    if (savedTotalItems !== null) {
      setTotalItems(parseInt(savedTotalItems, 10));
    }

    const searchForm = document.querySelector('.search-form');

    document.querySelector('#search-btn').onclick = () => {
      searchForm.classList.toggle('active');
    };

    const handleScroll = () => {
      searchForm.classList.remove('active');

      if (window.scrollY > 80) {
        document.querySelector('.header .header-2').classList.add('active');
      } else {
        document.querySelector('.header .header-2').classList.remove('active');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('totalItems', totalItems.toString());
  }, [totalItems]);

  const handleLoginClick = () => {
    window.location.href = '/login'; 
  };

  const LogOut = () => {
    localStorage.removeItem('token'); 
    user.setUser(null);
    user.setIsAuth(false);
    setIsLogoutVisible(false);
    setTotalItems(0);
    alert('Вы успешно вышли из аккаунта');
    window.location.href = '/'; 
  };

  const handleProfileClick = () => {
    if (user.isAuth) {
      setIsLogoutVisible(!isLogoutVisible);
    } else {
      handleLoginClick(); 
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    console.log('User Token:', token); 

    if (token) {
      const decodedToken = jwt_decode(token);
      const userRole = decodedToken.role;

      console.log('User Role:', userRole); 
      user.setRole(userRole);
    }
  }, [user.role]);

  useEffect(() => {
    if (user.isAuth) {
      setIsLogoutVisible(true); 
    } else {
      setIsLogoutVisible(false); 
    }
  }, [user.isAuth]);

  return (
    <div>
      <header className="header">
        <div className="header-1">
          <Link to="/" className="logo">
            <i className="fas fa-book"></i> BookShop
          </Link>
  
          <form action="" className="search-form">
            <input
              type="search"
              name="search-box"
              id="search-box"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label htmlFor="search-box" className="fas fa-search"></label>
          </form>
  
          <div className="icons">
            <div id="search-btn" className="fas fa-search"></div>
            {user.isAuth && (
              <a href="/admin" className="fas fa-plus"></a>
            )}
            <Link to="/basket" className="fas fa-shopping-cart">
              <span className="cart-badge">{totalItems}</span>
            </Link>
            <div
              id="login-btn"
              className={`fas ${user.isAuth ? 'fa-sign-out-alt' : 'fa-user'} ${isLogoutVisible ? 'active' : ''}`}
              onClick={user.isAuth ? LogOut : handleLoginClick}
            ></div>

            {isLogoutVisible && (
              <div className="profile-menu">
                <span onClick={LogOut}></span>
              </div>
            )}
          </div>
        </div>
        
        <div className="header-2">
          <nav className="navbar">
            <a href="/">home</a>
            <a href="/shop">shop</a>
            <a href="/profile">profile</a>
            <a href="/contact">contact</a>
          </nav>
        </div>
      </header>
  
      <nav className="bottom-navbar">
        <nav className="navbar">
          <Link to="/" className="fas fa-home"></Link>
          <Link to="/shop" className="fas fa-shop"></Link>
          <Link to="/contact" className="fas fa-blog"></Link>
        </nav>
      </nav>
    </div>
  );
};

export default NavBar;
