import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/NavBar';
import Footer from './components/Footer';

const App =() => {
  return(
    <BrowserRouter> 
    <Navbar></Navbar>
    <AppRouter/>
    <Footer/>
      </BrowserRouter>
  );
};
export default App;