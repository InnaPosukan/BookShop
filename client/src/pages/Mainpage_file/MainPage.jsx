import React, { useState, useEffect } from 'react';
import 'react-slideshow-image/dist/styles.css';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { fetchTopNewBooks } from '../../http/bookApi';
import MainBackground from '../../assets/MainBackground.jpg';

const MainPage = () => {
  const [newBooks, setNewBooks] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);
  const [currentSection, setCurrentSection] = useState('recommend');

  useEffect(() => {
    fetchNewBooks();
  }, []);
  
  const fetchNewBooks = async () => {
    try {
      console.log('Запрос новых книг');
      const newBooksData = await fetchTopNewBooks();
      console.log('Получены данные новых книг:', newBooksData);
      
      const newRows = newBooksData.rows;
      console.log('Новые строки данных:', newRows);
      
      setNewBooks(newRows);
      generateRandomBooks(newRows);
    } catch (error) {
      console.error('Ошибка при получении новых книг:', error);
    }
  };
  
  
  const generateRandomBooks = (booksData) => {
    const shuffledBooks = booksData.slice();
    for (let i = shuffledBooks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledBooks[i], shuffledBooks[j]] = [shuffledBooks[j], shuffledBooks[i]];
    }
    const selectedBooks = shuffledBooks.slice(0, );
    setRandomBooks(selectedBooks);
  };

  const handleNavClick = (section) => {
    setCurrentSection(section);
  };

  return (
    <div>
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

      <div className='section'>
      <div className='title'>
        <h1>Our Services</h1>
      </div>
      <div className='services'>
        <div className='card'>
          <div className='icon'>
            <i className='fas fa-car'></i>
          </div>
          <h2> Fast Delivery</h2>
          <p> We take pride in providing swift and efficient delivery services to our valued customers</p>
        </div>
        <div className='card'>
          <div className='icon'>
            <i className='fas fa-money-bill-wave'></i>
          </div>
          <h2> Affordable prices</h2>
          <p> We are delighted to offer our customers competitive and affordable prices</p>
        </div>
        <div className='card'>
          <div className='icon'>
            <i className='fas fa-user-tie'></i>
          </div>
          <h2> Polite staff</h2>
          <p> We firmly believe that each individual deserves to be treated with dignity and kindness. </p>
        </div>
      </div>
    </div>

      <nav className="custom-navbar">
        <div className="custom-nav-links">
          <a
            className={`custom-nav-link ${currentSection === 'recommend' ? 'active' : ''}`}
            onClick={() => handleNavClick('recommend')}
          >
            We recommend
          </a>
          <a
            className={`custom-nav-link ${currentSection === 'recentlyAdded' ? 'active' : ''}`}
            onClick={() => handleNavClick('recentlyAdded')}
          >
            Recently added
          </a>
        </div>
      </nav>
{currentSection === 'recommend' && (
  <div className="random-books">
    <ul>
      {randomBooks.slice(0, 4).map((book, index) => (
        <li key={book.id}>
          <Link to={`/bookpage/${book.id}`}>
            <div className="book-card">
              <img
                src={process.env.REACT_APP_API_URL + book.img}
                alt={book.name}
                className="book-image"
              />
              <div className="book-info">
                <span className="book-title" style={{ fontSize: '15px' }}>
                  {book.name}
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}

{currentSection === 'recentlyAdded' && (
  <div className="last-added-books">
    <ul>
      {newBooks
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4) 
        .map((book, index) => (
          <li key={book.id}>
            <div className="book-card">
              <Link to={`/bookpage/${book.id}`}>
                <img
                  src={process.env.REACT_APP_API_URL + book.img}
                  alt={book.name}
                  className="book-image"
                />
                <div className="book-info">
                  <span className="book-title">
                    {book.name}
                  </span>
                  <span className="added-on">
                    Added on: {new Date(book.createdAt).toLocaleString()}
                  </span>
                </div>
              </Link>
            </div>
          </li>
        ))}
    </ul>
  </div>
)}


    </div>
  );
};

export default MainPage;