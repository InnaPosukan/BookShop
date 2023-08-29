import React, { createContext, useState, useContext } from 'react';

const CartDataContext = createContext();

export const CartDataProvider = ({ children }) => {
  const [cartDataId, setCartDataId] = useState(null);
  const [clearCartFunction, setClearCartFunction] = useState(null); 

  const clearCart = async () => {
    if (clearCartFunction) {
      await clearCartFunction();
    }
  };

  return (
    <CartDataContext.Provider value={{ cartDataId, setCartDataId, clearCart, setClearCartFunction }}>
      {children}
    </CartDataContext.Provider>
  );
};

export const useCartData = () => useContext(CartDataContext);
