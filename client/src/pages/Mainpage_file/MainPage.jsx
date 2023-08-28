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
      const newBooksData = await fetchTopNewBooks();
      setNewBooks(newBooksData.rows);
      generateRandomBooks(newBooksData.rows);
    } catch (error) {
      console.error('Error fetching new books:', error);
    }
  };

  const generateRandomBooks = (booksData) => {
    const shuffledBooks = booksData.slice();
    for (let i = shuffledBooks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledBooks[i], shuffledBooks[j]] = [shuffledBooks[j], shuffledBooks[i]];
    }
    const selectedBooks = shuffledBooks.slice(0, 4);
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
    {randomBooks.map((book, index) => (
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