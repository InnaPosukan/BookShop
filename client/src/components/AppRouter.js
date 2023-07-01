import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { MAINPAGE_ROUTE } from '../utils/consts';
import { Context } from '../index';

const AppRouter = () => {
  const{user} = useContext(Context)
  
  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={MAINPAGE_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
