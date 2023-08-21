import React, { useEffect, useState } from 'react';
import {
  fetchCartData,
  removeFromCart,
  updateCartItemQuantity
} from '../../http/bookApi';
import './Basket.css';
import { useBasket } from '../../BasketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Basket = ({ bookId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const { totalItems, setTotalItems } = useBasket();

  useEffect(() => {
    fetchCartData()
      .then(cartData => {
        setCartItems(cartData.basket_books);

        const newTotal = cartData.basket_books.reduce((total, cartItem) => {
          return total + cartItem.book.price * cartItem.quantity;
        }, 0);
        setTotalCost(newTotal);

        const newTotalQuantity = cartData.basket_books.reduce(
          (totalQty, cartItem) => totalQty + cartItem.quantity,
          0
        );
        setTotalItems(newTotalQuantity);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, [bookId, cartItems, setTotalItems]);

  const handleRemoveItem = async cartItemId => {
    try {
      await removeFromCart(cartItemId);
      setCartItems(prevCartItems =>
        prevCartItems.filter(item => item.id !== cartItemId)
      );
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCart(cartItemId);
        setCartItems(prevCartItems =>
          prevCartItems.filter(item => item.id !== cartItemId)
        );
      } else {
        await updateCartItemQuantity(cartItemId, newQuantity);
        setCartItems(prevCartItems =>
          prevCartItems.map(item =>
            item.id === cartItemId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  return (
      <div className="basket-page">
        <div className="shopping-cart-label">
          <h2>Shopping Cart</h2>
        </div>     
         <div className="cart-items-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cartItems) &&
              cartItems.map(cartItem => (
                <tr key={cartItem.id} className="cart-item">
                  <td>{cartItem.book.name}</td>
                  <td>{cartItem.book.price * cartItem.quantity} грн</td>
                  <td>
                    <div className="quantity-controls">
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleQuantityChange(cartItem.id, cartItem.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="quantity">{cartItem.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleQuantityChange(cartItem.id, cartItem.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="remove-icon"
                      onClick={() => handleRemoveItem(cartItem.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="additional-container">
      <div className="additional-content">
        <p>Общее количество товаров в корзине: {totalItems}</p>
        <p>Общая стоимость: {totalCost} грн</p>
      </div>
      <div className="buy-button-container">
        <button className="buy-button">Купить</button>
      </div>
      </div>

    </div>
  );
};

export default Basket;
