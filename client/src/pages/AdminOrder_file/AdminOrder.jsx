import React, { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../../http/bookApi';
import './AdminOrder.css';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [sortingStatus, setSortingStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await fetchAllOrders();
        const sortedOrders = sortingStatus
          ? ordersData.filter(order => order.status === sortingStatus)
          : ordersData;
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching all orders:', error);
      }
    };

    fetchOrders();
  }, [sortingStatus]);

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prevOrders =>
        prevOrders.map(order => {
          if (order.id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        })
      );
    } catch (error) {
      console.error(`Error updating order status to "${newStatus}":`, error);
    }
  };

  const calculateTotalPrice = books => {
    return books.reduce(
      (total, book) => total + book.book.price * book.quantity,
      0
    );
  };

  return (
    <div className="container">
      <h1 className="h1">Customer Orders</h1>
      <div className="filter-section">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={sortingStatus}
          onChange={event => setSortingStatus(event.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <div className="order-details">
              <p>Order {index + 1}:</p>
              <p>Name: {order.firstName}</p>
              <p>Last Name: {order.lastName}</p>
              <p>Status: {order.status}</p>
              <p>Address: {order.address}</p>
              <p>Phone: {order.phoneNumber}</p>
              <p>Ordered Books:</p>
              {order.basket && order.basket.basket_books && order.basket.basket_books.length > 0 ? (
                <ul className="ordered-books-list">
                  {order.basket.basket_books.map((basketBook, bookIndex) => (
                    <li key={bookIndex}>
                      <p>Book Title: {basketBook.book.name}</p>
                      <p>Price: {basketBook.book.price} грн</p>
                      <p>Quantity: {basketBook.quantity}</p>
                    </li>
                  ))}
                  <li className="total-price">
                    <p>Total Price: {calculateTotalPrice(order.basket.basket_books)} грн</p>
                  </li>
                </ul>
              ) : (
                <p>No information available for books in this order.</p>
              )}
            </div>
            <div className="order-buttons">
              <button onClick={() => handleOrderStatusUpdate(order.id, 'Accepted')}>Order Accepted</button>
              <button onClick={() => handleOrderStatusUpdate(order.id, 'Delivered')}>Order Delivered</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrder;
