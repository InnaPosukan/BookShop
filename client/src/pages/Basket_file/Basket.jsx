import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../CartContext';
import './Basket.css';

const Basket = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useContext(CartContext);
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    console.log('Current cart:', cart);

    const quantities = {};
    cart.forEach((item) => {
      quantities[item.id] = item.quantity;
    });
    setItemQuantities(quantities);
  }, [cart]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartItemQuantity(itemId, newQuantity);
  
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: newQuantity,
      }));
    }
  };
  const totalCost = cart.reduce((total, book) => total + (book.price * book.quantity), 0);
  if (totalCost==0) {
    return <p>Корзина пуста</p>;
  }
  return (
    <section className='basket'>
      <div className='container'>
        <div className='basket_top'>
          <h1>Корзина</h1>
        </div>
        <ul className='basket_list'>
          {cart.map((book) => (
            <li key={book.id} className='basket_item'>
              {book.name}
              <div className='basket_item-right'>
                <div className='basket_item-count'>
                  <button
                    className='basket_item-minus'
                    onClick={() =>
                      handleQuantityChange(
                        book.id,
                        Math.max(itemQuantities[book.id] - 1, 0)
                      )
                    }
                  >
                    -
                  </button>
                  <span className='basket_item-count-number'>
                    {itemQuantities[book.id] || 0}
                  </span>
                  <button
                    className='basket_item-plus'
                    onClick={() => handleQuantityChange(book.id, itemQuantities[book.id] + 1)}
                  >
                    +
                  </button>
                </div>
                <p className='basket_item-price'>
                  Стоимость: {book.price * (itemQuantities[book.id] || 0)} грн
                </p>
                <button
                  className='basket_item-del'
                  onClick={() => removeFromCart(book.id)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p className='total-cost'>Общая стоимость: {totalCost} грн</p>
      </div>
    </section>
  );
};

export default Basket;
