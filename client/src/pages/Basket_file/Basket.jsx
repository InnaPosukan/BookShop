import React, { useEffect, useState } from 'react';
import { fetchCartData, removeFromCart, updateCartItemQuantity } from '../../http/bookApi';
import './Basket.css';
const Basket = ({ bookId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartData()
      .then(cartData => {
        console.log('Fetched cart data:', cartData);
        setCartItems(cartData.basket_books);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, [bookId]);


  
  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== cartItemId));
     
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  
  
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCart(cartItemId);
        setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== cartItemId));
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
      <ul>
        {Array.isArray(cartItems) &&
          cartItems.map(cartItem => {
            console.log('Cart Item:', cartItem);
            console.log('Book:', cartItem.book);
  
            console.log('Image URL:', `/static/${cartItem.book.img}`);
            return (
              <li key={cartItem.id}>
                <div className="cart-item">
                  <img
                    src={`/static/${cartItem.book.img}`}
                    onError={(e) => {
                      console.error('Ошибка изображения:', e.message);
                      console.error('URL изображения:', e.target.src);
                      console.error('Альтернативный текст:', e.target.alt);
                    }}
                    alt={cartItem.book && cartItem.book.name}
                    />
  
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
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
  


};

export default Basket;
