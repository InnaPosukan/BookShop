import React, { useEffect, useState } from 'react';
import { fetchOrderHistory } from '../../http/bookApi';
import { decode as jwt_decode } from 'jsonwebtoken';
import './Orderhistory.css';

const OrderHistory = ({ bookId }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [sortingStatus, setSortingStatus] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;

      fetchOrderHistory(userId)
        .then(history => {
          const sortedHistory = sortingStatus
            ? history.filter(order => order.status === sortingStatus)
            : history;

          setOrderHistory(sortedHistory);
        })
        .catch(error => {
          console.error('Error fetching order history:', error);
        });
    }
  }, [sortingStatus]);

  const calculateTotalPrice = (books) => {
    return books.reduce((total, book) => total + (book.book.price * book.quantity), 0);
  };

  return (
    <div className="order-history-page">
      <div className="order-history-label">
        <h2>Order History</h2>
      </div>
      <div className="order-history-container">
        <select
          value={sortingStatus}
          onChange={event => setSortingStatus(event.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="delivered">Delivered</option>
        </select>
        <ul className="order-history-list">
          {orderHistory.map((order, index) => (
            <li key={index} className="order-history-item">
                <p>Заказ {index + 1}:</p>
                <p>Имя: {order.firstName}</p>
                <p>Фамилия: {order.lastName}</p>
                <p>Статус: {order.status}</p>
                <p>Адрес: {order.address}</p>
                <p>Телефон: {order.phoneNumber}</p>
                <p>Книги в заказе:</p>
                {order.basket && order.basket.basket_books && order.basket.basket_books.length > 0 ? (
                  <ul className="ordered-books-list">
                    {order.basket.basket_books.map((basketBook, bookIndex) => (
                      <li key={bookIndex}>
                        <p>Название: {basketBook.book.name}</p>
                        <p>Цена: {basketBook.book.price} грн</p>
                        <p>Количество: {basketBook.quantity}</p>
                      </li>
                    ))}
                    <li className="total-price">
                    <p>Total Price: {calculateTotalPrice(order.basket.basket_books)} грн</p>
                  </li>
                  </ul>
                ) : (
                  <p>Нет информации о книгах в этом заказе.</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  const calculateTotalPrice = (books) => {
  return books.reduce((total, book) => total + (book.book.price * book.quantity), 0);
};
  export default OrderHistory; 