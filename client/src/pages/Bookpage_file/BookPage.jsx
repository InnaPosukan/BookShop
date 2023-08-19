import React, { useEffect, useState } from 'react';
import Rating from '../../components/Rating/Rating';
import { useParams } from 'react-router-dom';
import { decode as jwt_decode } from 'jsonwebtoken';
import { fetchOneBook, fetchAverageRating, sendRating, updateBookRating, addToCart } from '../../http/bookApi';
import './BookPage.css';
import { useBasket} from '../../BasketContext';
const BookPage = () => {
  const { increaseTotalItems } = useBasket();

  const [book, setBook] = useState({ info: [] });
  const imageSrc = process.env.REACT_APP_API_URL + book.img;
  const [userId, setUserId] = useState(null);
  const [quantity, setQuantity] = useState(1); 

  const { id } = useParams();

  useEffect(() => {
    fetchOneBook(id).then(data => setBook(data));
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.id);
    }

    fetchAverageRating(id)
      .then(averageRating => {
        console.log('Average Rating:', averageRating);
      })
      .catch(error => {
        console.error('Error fetching average rating:', error);
      });

  }, [id]);

  const handleRatingChange = async (newRating) => {
    try {
      if (!userId) {
        console.error('User ID not available.');
        return;
      }

      console.log('Sending rating:', newRating);

      await sendRating(id, newRating, userId);
      console.log('Rating sent successfully.');

      await updateBookRating(id, newRating);
      console.log('Book rating updated.');

      const newAverageRating = await fetchAverageRating(id);
      console.log('New average rating:', newAverageRating);
    } catch (error) {
      console.error('Error sending rating:', error);
    }
  };
  const handleAddToCart = () => {
    console.log('Add to Cart button clicked');
    console.log('Book details:', book);
    console.log('Selected quantity:', quantity);
  
    addToCart(book.id, quantity)
      .then(data => {
        increaseTotalItems(quantity); // Increase by the selected quantity
  
        console.log('Items added to cart:', data);
      })
      .catch(error => {
        console.error('Error adding items to cart:', error);
      });
  };
  
  return (
    <div className="book-page-container">
      <div className="book-details-container">
        <div style={{ display: "flex" }}>
          <img
            src={imageSrc}
            alt={book.name}
          />
          <div className="info-class">
            <div className="info-box">
              <h2 className="book-title">{book.name}</h2>
              <Rating bookId={id} userId={userId} />
              <p className="book-price">Ціна: {book.price} грн</p>
              <input
  type="number"
  value={quantity}
  onChange={(e) => setQuantity(Number(e.target.value))}
  min="1"
  max="99"
/>
<button onClick={handleAddToCart}>Добавить в корзину</button>
            </div>
          </div>
        </div>
        <p className="book-info-heading">Детальна інформація про книгу</p>
        <table className="book-info-table">
          <tbody>
            {book.info.map((item) => (
              <tr key={item.id}>
                <td>{item.title}:</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookPage;