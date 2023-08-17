import React, { useContext, useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './NavBar.css';
import { Context } from '..';
import { useSearch } from '../searchContext';
const NavBar = () => {
  const { user } = useContext(Context);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
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

  const handleLoginClick = () => {
    window.location.href = '/login'; 
  };
  const LogOut = () => {
    localStorage.removeItem('token'); 
    user.setUser(null);
    user.setIsAuth(false);
    setIsLogoutVisible(false);
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

  return (
    <div>
      <header className="header">
        <div className="header-1">
          <a href="/" className="logo">
            <i className="fas fa-book"></i> BookShop
          </a>
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
            <a href="/basket" className="fas fa-shopping-cart"></a>
            <a href="#" className="fas fa-heart"></a>
            <div
              id="login-btn"
              className={`fas fa-user ${isLogoutVisible ? 'active' : ''}`}
              onClick={handleProfileClick}
            ></div>
            {isLogoutVisible && (
              <div className="profile-menu">
                <span onClick={LogOut}>Log Out</span>
              </div>
            )}
          </div>
        </div>
        <div className="header-2">
          <nav className="navbar">
            <a href="/">home</a>
            <a href="/shop">shop</a>
            <a href="#reviews">reviews</a>
            <a href="#contact">contact</a>
          </nav>
        </div>
      </header>
      <nav className="bottom-navbar">
        <nav className="navbar">
          <a href="/" class="fas fa-home"></a>
          <a href="/shop" class="fas fa-shop"></a>
          <a href="/basket" class="fas fa-comments"></a>
          <a href="#contact" class="fas fa-blog"></a>
        </nav>
      </nav>
    </div>
  );
};

export default NavBar;
