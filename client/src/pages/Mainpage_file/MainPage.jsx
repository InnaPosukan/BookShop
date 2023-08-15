import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import './MainPage.css';
import { Link } from 'react-router-dom'; 
import MainBackground from '../../assets/MainBackground.jpg'; 
const MainPageContent = () => {
  return (
    <div className="image-container">
      <img className="image" src={MainBackground} alt="Main Image" />
      <div className="image-text">
        <p>Buy your</p>
        <p style={{ color: 'orange' }}>favourite book</p>
        <p>from here</p>
        <Link to="/shop"> 
          <button className="shop-now-button">Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPageContent;
