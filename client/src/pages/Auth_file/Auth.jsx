import React, { useContext, useState } from 'react';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import { useLocation, NavLink, useNavigate } from 'react-router-dom'; // Import useHistory
import { registration, login } from '../../http/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import './Auth.css';
const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();

  const navigate = useNavigate();

  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    setEmail('');
    setPassword('');
  };

  const handleClick = async () => {
    let data;
    try {
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      console.log('User State after successful login/registration:', user); // Add this log

      navigate(SHOP_ROUTE);
    } catch (error) {
      if (error && error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred.');
      }
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-heading">{isLogin ? 'Login' : 'Registration'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            onClick={handleClick}
            className="button"
          >
            {isLogin ? 'Sign in' : 'Register'}
          </button>
        </form>
        <div className="auth-info">
          {isLogin ? (
            <div>
              Not registered yet? <NavLink to={REGISTRATION_ROUTE} className="link">Register here!</NavLink>
            </div>
          ) : (
            <div>
              Have an account? <NavLink to={LOGIN_ROUTE} className="link">Sign in!</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Auth;