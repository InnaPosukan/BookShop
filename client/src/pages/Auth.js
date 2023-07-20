import React, { useState } from 'react';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useLocation, NavLink } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);

    setUsername('');
    setPassword('');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
      <div style={{ backgroundColor: 'lightyellow', padding: '20px', borderRadius: '5px' }}>
        <h2>{isLogin ? 'Login' : 'Registration'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {isLogin ? 'Sign in' : 'Register'}
          </button>
        </form>
        {isLogin ? (
          <div>
            Not registered yet? <NavLink to={REGISTRATION_ROUTE}>Register here!</NavLink>
          </div>
        ) : (
          <div>
            Have an account? <NavLink to={LOGIN_ROUTE}>Sign in!</NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
