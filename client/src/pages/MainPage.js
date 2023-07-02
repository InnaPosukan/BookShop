import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Link } from 'react-router-dom'; 

import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';
import book5 from '../assets/book5.jpg';
import book6 from '../assets/book6.jpg';

const MainPage = () => {
  const slideImages = [image1, image2];
  const [containerHeight, setContainerHeight] = useState('33vh');

  const updateDimensions = () => {
    const windowHeight = window.innerHeight;
    const containerHeight = windowHeight / 2;
    setContainerHeight(containerHeight);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const slideContainerStyle = {
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1', 
  };

  const slideIndicatorsStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    height: '10%',
  };

  const buttonStyle = {
    position: 'fixed',
    top: '65%',
    left: '36.5%',
    paddingTop: '4px',
    paddingBottom: '4px',
    backgroundColor: 'rgba(255, 165, 0, 0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const books = [
    { image: book1, price: '$9.99' },
    { image: book2, price: '$14.99' },
    { image: book3, price: '$12.99' },
    { image: book4, price: '$13.99' },
    { image: book5, price: '$1.99' },
    { image: book6, price: '$11.99' },

  ];

  const bookContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '20px',
    zIndex: '2', 
    marginBottom: '300px', 
  };
  
  const bookStyle = {
    width: '250px', 
    margin: '10px',
    textAlign: 'center',
  };
  
  const bookImageStyle = {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  };
  

  const bookPriceStyle = {
    marginTop: '10px',
    fontWeight: 'bold',
  };

  const buyNowButtonStyle = {
    marginTop: '10px',
    backgroundColor: 'rgba(255, 165, 0, 0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div>
      <div className="menu">
        <Slide
          autoplay={false}
          arrow={false}
          indicators={true}
          style={slideContainerStyle}
          prevArrow={<div />}
          nextArrow={<div />}
        >
          {slideImages.map((image, index) => (
            <div className="menu-item" key={index}>
              <img src={image} alt={`Image ${index + 1}`} style={imageStyle} />
              {index === 0 && (
                <Link to="/shop">
                  <button
                    style={buttonStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#FFC554')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(255, 165, 0, 0.5)')}
                  >
                    Shop now
                  </button>
                </Link>
              )}
            </div>
          ))}
        </Slide>
        <div style={slideIndicatorsStyle}></div>
      </div>

      <div style={bookContainerStyle}>
        {books.map((book, index) => (
          <div key={index} style={bookStyle}>
            <img src={book.image} alt={`Book ${index + 1}`} style={bookImageStyle} />
            <div style={bookPriceStyle}>{book.price}</div>
            <button style={buyNowButtonStyle}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
