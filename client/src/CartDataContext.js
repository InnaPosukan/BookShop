import React, { createContext, useContext, useState } from 'react';

const CartDataContext = createContext();

export const CartDataProvider = ({ children }) => {
  const [cartDataId, setCartDataId] = useState(null);

  return (
    <CartDataContext.Provider value={{ cartDataId, setCartDataId }}>
      {children}
    </CartDataContext.Provider>
  );
};

export const useCartData = () => useContext(CartDataContext);
