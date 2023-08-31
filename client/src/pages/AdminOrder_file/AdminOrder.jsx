import React, { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../../http/bookApi';
import './AdminOrder.css';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [sortingStatus, setSortingStatus] = useState('');

  useEffect(() => {
    fetchAllOrders()
      .then(ordersData => {
        const sortedOrders = sortingStatus
          ? ordersData.filter(order => order.status === sortingStatus)
          : ordersData;
          
        setOrders(sortedOrders);
      })
      .catch(error => {
        console.error('Error fetching all orders:', error);
      });
  }, [sortingStatus]);

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prevOrders => prevOrders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      }));
    } catch (error) {
      console.error(`Error updating order status to "${newStatus}":`, error);
    }
  };

  const calculateTotalPrice = (books) => {
    return books.reduce((total, book) => total + (book.book.price * book.quantity), 0);
  };

  return (
    <div className='container'>
      <h1 className='h1'>Customer Orders</h1>
      <select
        value={sortingStatus}
        onChange={event => setSortingStatus(event.target.value)}
      >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="delivered">Delivered</option>
      </select>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
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
            <button onClick={() => handleOrderStatusUpdate(order.id, 'accepted')}>Заказ принят</button>
            <button onClick={() => handleOrderStatusUpdate(order.id, 'delivered')}>Заказ доставлен</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrder;
