import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/Userstore';
import BookStore from './store/BookStore';

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{ 
    user: new UserStore(),
    books: new BookStore(),
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
