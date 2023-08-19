import React, { useEffect, useState } from 'react';
import {
  fetchCartData,
  removeFromCart,
  updateCartItemQuantity
} from '../../http/bookApi';
import './Basket.css';
import { useBasket } from '../../BasketContext';

const Basket = ({ bookId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const { totalItems, setTotalItems } = useBasket(); // Correct usage of the useBasket hook

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
        setTotalItems(newTotalQuantity); // Use setTotalItems to update the totalItems state
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
    <div className="cart-items-container">
      <h2>Корзина</h2>
      <p>Общее количество товаров: {totalItems}</p>
      <p>Total Cost: {totalCost} грн</p>

      <ul>
        {Array.isArray(cartItems) &&
          cartItems.map(cartItem => (
            <li key={cartItem.id}>
              <div className="cart-item-details">
                <p>
                  {cartItem.book.name} - Ціна: {cartItem.book.price * cartItem.quantity} грн
                </p>
                <p>Кількість:</p>
                <button onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity - 1)}>-</button>
                {cartItem.quantity}
                <button onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity + 1)}>+</button>
                <button onClick={() => handleRemoveItem(cartItem.id)}>Видалити</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Basket;
