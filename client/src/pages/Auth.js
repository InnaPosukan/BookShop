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

  const authContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const authFormStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '5px',
    width: '500px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', 
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: '#FAA90C',
    color: '#000',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px', 
  };

  const authInfoStyle = {
    textAlign: 'center',
    marginTop: '20px',
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
  };

  return (
    <div style={authContainerStyle}>
      <div style={authFormStyle}>
        <h2 style={headingStyle}>{isLogin ? 'Login' : 'Registration'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="username" style={labelStyle}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              placeholder="Enter your username"
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            style={{ ...buttonStyle }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#FFC554'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#FAA90C'}
          >
            {isLogin ? 'Sign in' : 'Register'}
          </button>
        </form>
        <div style={authInfoStyle}>
          {isLogin ? (
            <div>
              Not registered yet? <NavLink to={REGISTRATION_ROUTE} style={linkStyle}>Register here!</NavLink>
            </div>
          ) : (
            <div>
              Have an account? <NavLink to={LOGIN_ROUTE} style={linkStyle}>Sign in!</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
