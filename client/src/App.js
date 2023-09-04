import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userApi';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prevText) =>
        prevText === 'Loading...' ? 'Loading' : prevText + '.'
      );
    }, 500);

    check()
      .then((data) => {
        user.setUser(true);
        user.setIsAuth(true);
      })
      .finally(() => {
        clearInterval(interval);
        setLoading(false);
      });

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  if (loading) {
    return <div>{loadingText}</div>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
});

export default App;
