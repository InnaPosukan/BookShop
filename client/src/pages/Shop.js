import React, { useContext, useEffect } from 'react';
import TypeBar from '../components/TypeBar';
import BookList from '../components/BookList';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBooks, fetchTypes } from '../http/bookApi';

const Shop = observer (() => {
  const {book} = useContext(Context)
  useEffect(() =>{
    fetchTypes().then(data => book.setTypes(data))
    fetchBooks().then(data => book.setBooks(data.rows))


  },[])
  const navigate = useNavigate();
  const isAdmin = true; 

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
});

export default Shop;
