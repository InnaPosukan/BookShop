import React, { createContext, useState, useContext } from 'react';

const BasketContext = createContext();

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {

  return (
    <BasketContext.Provider value={{ }}>
      {children}
    </BasketContext.Provider>
  );
};
