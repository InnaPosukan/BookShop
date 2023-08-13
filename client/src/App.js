import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  return (
      <BrowserRouter>
        <Navbar />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    
  );
});

export default App;
