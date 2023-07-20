import React from 'react';
import TypeBar from '../components/TypeBar';
import BookList from '../components/BookList';

const Shop = () => {
  return (
    <div className='mt-2' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: '0 0 25%', backgroundColor: '#white' }}>
        <TypeBar />
      </div>
      <div style={{ flex: '0 0 75%', backgroundColor: '#f9f9f9', display: 'flex', flexWrap: 'wrap' }}>
        <BookList />
      </div>
    </div>
  );
};

export default Shop;
