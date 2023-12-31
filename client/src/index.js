import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createContext } from 'react';
import UserStore from './store/Userstore';
import BookStore from './store/BookStore';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SearchProvider } from './components/Context/searchContext';
import { BasketProvider } from './components/Context/BasketContext';
import { CartDataProvider } from './components/Context/CartDataContext';

export const Context = createContext(null);
console.log("API URL:", process.env.REACT_APP_API_URL);
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <SearchProvider>
    <BasketProvider>
      <CartDataProvider>
        <Context.Provider value={{ 
          user: new UserStore(),
          book: new BookStore(), 
        }}>
          <App />
        </Context.Provider>
      </CartDataProvider>
    </BasketProvider>
  </SearchProvider>
);
