import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import UserStore from '../store/Userstore'; 

const userStore = new UserStore(); 

const AppRouter = () => {
  console.log("isAuth:", userStore.isAuth);
  console.log("publicRoutes:", publicRoutes);
  console.log("authRoutes:", authRoutes);

  return (
   <Routes>
  {publicRoutes.map(({ path, Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ))}
  {userStore.isAuth && authRoutes.map(({ path, Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ))}
</Routes>

  );
};

export default AppRouter;
