import React, { useContext, useEffect } from 'react';
import TypeBar from '../../components/TypeBar/TypeBar';
import BookList from '../../components/BookList/BookList';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { fetchBooks, fetchTypes } from '../../http/bookApi';
import Pages from '../../components/Pagination/Pages';
import './Shop.css'; 
import { decode as jwt_decode } from 'jsonwebtoken';

const Shop = observer(() => {
  const { book, user } = useContext(Context); 

  useEffect(() => {
    fetchTypes().then(data => book.setTypes(data));
    fetchBooks().then(data => {
      book.setBooks(data.rows);
      book.setTotalCount(data.count);
    });
    fetchBooks(null, 1, 3).then(data => {
      book.setBooks(data.rows);
      book.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchBooks(book.selectedType.id, book.page, 8).then(data => {
      book.setBooks(data.rows);
      book.setTotalCount(data.count);
    });
  }, [book.page, book.selectedType]);

  const navigate = useNavigate();

  const handleAdminClick = () => {
    console.log('Navigating to admin route...');
    navigate(ADMIN_ROUTE);
  };

  return (
      <div className='mt-2' style={{ display: 'flex', justifyContent: 'space-between', flex: '1 1 auto' }}>
        <div style={{ flex: '0 0 25%', backgroundColor: '#white' }}>
          <TypeBar />
        </div>
        <div style={{ flex: '0 0 75%', backgroundColor: '#f9f9f9', display: 'flex', flexWrap: 'wrap' }}>
          <BookList />
          <Pages />
        </div>
      </div>
  );
});

export default Shop;
