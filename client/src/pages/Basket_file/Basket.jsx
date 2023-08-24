import React, { useState, useEffect } from 'react';
import {
  fetchCartData,
  removeFromCart,
  updateCartItemQuantity,
} from '../../http/bookApi';
import './Basket.css';
import { useBasket } from '../../BasketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CreateOrders from '../../components/modals/createOrders';
import { useCartData } from '../../CartDataContext';
import { decode as jwt_decode } from 'jsonwebtoken';
import { Link } from 'react-router-dom';

const Basket = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const { totalItems, setTotalItems } = useBasket();
  const [isModalOpen, setModalOpen] = useState(false);
  const { cartDataId, setCartDataId } = useCartData();
  const {setClearCartFunction} = useCartData();

  const openModal = () => {
    if (cartItems.length > 0) {
      setModalOpen(true);
    }else{
      alert("No found items in the cart")
    }
  };
  useEffect(() => {
    setClearCartFunction(() => clearCart);
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
      console.log('User ID:', userId);
    }
  }, []);

  useEffect(() => {
    fetchCartData()
      .then(cartData => {
        console.log('Cart Data:', cartData);
        setCartDataId(cartData.id);

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
        console.log('cartData:', cartData);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const handleRemoveItem = async cartItemId => {
    try {
      console.log('Removing item with cartItemId:', cartItemId);

      console.log('Total items before removal:', totalItems);

      const itemToRemove = cartItems.find(item => item.id === cartItemId);
      const itemPrice = itemToRemove.book.price * itemToRemove.quantity;

      await removeFromCart(cartItemId);
      setCartItems(prevCartItems =>
        prevCartItems.filter(item => item.id !== cartItemId)
      );

      setTotalItems(prevTotalItems =>
        Math.max(prevTotalItems - itemToRemove.quantity, 0)
      );

      setTotalCost(prevTotalCost => prevTotalCost - itemPrice);

      console.log('Total items after removal:', totalItems);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      console.log('Updating quantity for item with cartItemId:', cartItemId);

      const itemToUpdate = cartItems.find(item => item.id === cartItemId);
      const oldQuantity = itemToUpdate.quantity;
      const itemPrice = itemToUpdate.book.price;

      if (newQuantity <= 0) {
        await removeFromCart(cartItemId);
        setCartItems(prevCartItems =>
          prevCartItems.filter(item => item.id !== cartItemId)
        );
        setTotalItems(prevTotalItems =>
          Math.max(prevTotalItems - oldQuantity, 0)
        );
        setTotalCost(prevTotalCost => prevTotalCost - itemPrice * oldQuantity);
      } else {
        await updateCartItemQuantity(cartItemId, newQuantity);
        setCartItems(prevCartItems =>
          prevCartItems.map(item =>
            item.id === cartItemId ? { ...item, quantity: newQuantity } : item
          )
        );

        setTotalCost(
          prevTotalCost =>
            prevTotalCost - itemPrice * oldQuantity + itemPrice * newQuantity
        );

        setTotalItems(
          prevTotalItems => prevTotalItems + newQuantity - oldQuantity
        );
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };
  const clearCart = async () => {
    try {
      await Promise.all(cartItems.map(async (cartItem) => {
        await removeFromCart(cartItem.id);
      }));
  
      setCartItems([]);
      setTotalItems(0);
      setTotalCost(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
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
                          handleQuantityChange(
                            cartItem.id,
                            cartItem.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="quantity">{cartItem.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleQuantityChange(
                            cartItem.id,
                            cartItem.quantity + 1
                          )
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
  <button className='button btn-outline-dark' onClick={openModal}>
    Buy
  </button>
  <Link to="/history" className='button btn-outline-dark order-history-button'>
    Order History
  </Link>
</div>


      {isModalOpen && (
        <CreateOrders show={isModalOpen} onHide={closeModal} cartDataId={cartDataId}  />
      )}
    </div>
  );
};

export default Basket;
