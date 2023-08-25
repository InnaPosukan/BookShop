import React from "react";
import { useNavigate } from "react-router-dom";
import { BOOKPAGE_ROUTE } from "../../utils/consts";
import "./BookItem.css"; 

const BookItem = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(BOOKPAGE_ROUTE + '/' + book.id);
  };

  return (
    <div className="book-item-container" onClick={handleClick}>
      <div className="book-image-container">
        <img
          className="book-image"
          src={process.env.REACT_APP_API_URL + book.img}
          alt={book.title}
        />
      </div>
      <div className="book-details">
        <div className="book-name">{book.name}</div>
        <div className="book-author">{book.author}</div>
        <div className="book-rating">{Math.round(book.rating * 100) / 100} ★</div>
      </div>
    </div>
  );
};

export default BookItem;
