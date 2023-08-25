import React, { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../../http/bookApi'; // Импортируйте функции
import './AdminOrder.css';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all'); // Добавляем выбранный статус

  useEffect(() => {
    fetchAllOrders()
      .then(ordersData => {
        setOrders(ordersData);
      })
      .catch(error => {
        console.error('Error fetching all orders:', error);
      });
  }, []);

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

  const filteredOrders = selectedStatus === 'all' ? orders : orders.filter(order => order.status === selectedStatus);

  const calculateTotalPrice = (books) => {
    return books.reduce((total, book) => total + (book.book.price * book.quantity), 0);
  };

  return (
    <div className='container'>
      <h1 className='h1'>Admin Orders</h1>
      <div>
        <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
          <option value="all">Все заказы</option>
          <option value="accepted">Принят</option>
          <option value="delivered">Доставлен</option>
        </select>
      </div>
      <div className="order-list">
        {filteredOrders.map((order, index) => (
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