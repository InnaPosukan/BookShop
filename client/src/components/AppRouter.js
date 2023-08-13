import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { MAINPAGE_ROUTE } from '../utils/consts';
import { Context } from '../index';

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log('User Auth State:', user.isAuth);

  return (
    <Routes>
      {user.isAuth && (
        <div>
          {authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </div>
      )}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {/* Перенаправление на главную страницу только в случае, если пользователь не аутентифицирован */}
      {!user.isAuth && (
        <Route path="*" element={<Navigate to={MAINPAGE_ROUTE} />} />
      )}
    </Routes>
  );
};

export default AppRouter;
