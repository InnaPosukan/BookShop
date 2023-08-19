import React, { createContext, useContext, useState } from 'react';

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [totalItems, setTotalItems] = useState(0);

  const increaseTotalItems = (quantity = 1) => {
    setTotalItems(prevTotalItems => prevTotalItems + quantity);
  };
  const decreaseTotalItems = () => {
    setTotalItems(prevTotalItems => Math.max(prevTotalItems - 1, 0));
  };

  return (
    <BasketContext.Provider value={{ totalItems, setTotalItems, increaseTotalItems, decreaseTotalItems }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  return useContext(BasketContext);
};
