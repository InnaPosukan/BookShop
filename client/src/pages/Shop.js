import React from 'react';
import TypeBar from '../components/TypeBar';
import BookList from '../components/BookList';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../utils/consts';
// import UserStore from '../store/Userstore';

const Shop = () => {
  const navigate = useNavigate();
  // const userStore = new UserStore(); 
  const isAdmin = true; 
  // const isAuth = userStore.isAuth;

  const handleAdminClick = () => {
    console.log('Navigating to admin route...');
    navigate(ADMIN_ROUTE);
  };

  return (
    <div className='btn1' style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          flex: '0 0 50px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {isAdmin && (
          <button
            onClick={handleAdminClick}
            style={{
              fontSize: '16px',
              backgroundColor: '#f9f9f9',
              border: '1px solid #ccc',
              marginRight: '23px',
              textAlign: 'center',
              marginTop: '15px',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
          >
            Add new item
          </button>
        )}
      </div>
      <div
        className='mt-2'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flex: '1 1 auto',
        }}
      >
        <div style={{ flex: '0 0 25%', backgroundColor: '#white' }}>
          <TypeBar />
        </div>
        <div
          style={{
            flex: '0 0 75%',
            backgroundColor: '#f9f9f9',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <BookList />
        </div>
      </div>
    </div>
  );
};

export default Shop;
