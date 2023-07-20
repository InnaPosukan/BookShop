import React from 'react';
import book1 from '../assets/book1.jpg';

const BookPage = () => {
  const book = { id: 1, name: "После", price: 150, rating: 5, img: book1 };

  const bookContainerStyle = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
  };

  const imageStyle = {
    width: "250px",
    height: "300px",
    marginRight: "80px", 
  };

  const buttonStyle = {
    fontSize: "20px",
    border: "1px solid darkgray",
    padding: "10px 20px",
    backgroundColor: "white",
    cursor: "pointer",
  };

  const priceWithCurrency = `${book.price} грн`; 

  return (
    <div style={bookContainerStyle}>
      <div>
        <img style={imageStyle} src={book.img} alt={book.name} />
      </div>
      <div>
        <h2>{book.name}</h2>
        <h3>{priceWithCurrency}</h3> 
        <button style={buttonStyle}>Add to cart</button>
      </div>
    </div>
  );
};

export default BookPage;
