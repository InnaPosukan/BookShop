import React, { useState } from 'react';

import CreateType from '../../components/modals/createType';
import CreateBook from '../../components/modals/createBook';
import './Admin.css';
import { Link } from 'react-router-dom';
import DeleteBookModal from '../../components/modals/deleteBook'; 
import DeleteTypeModal from '../../components/modals/deleteType';

const Admin = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [addBookVisible, setAddBookVisible] = useState(false);
  const [deleteBookVisible, setDeleteBookVisible] = useState(false);
  const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);

  const openDeleteBookModal = () => {
    setDeleteBookVisible(true);
  };
  
  const closeDeleteBookModal = () => {
    setDeleteBookVisible(false);
  };
  
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openAddBookModal = () => {
    setAddBookVisible(true);
  };

  const closeAddBookModal = () => {
    setAddBookVisible(false);
  };
  const confirmDeleteBook = () => {

    setDeleteBookVisible(false);

  };
  const openDeleteTypeModal = () => {
    setDeleteTypeVisible(true);
  };
  
  const closeDeleteTypeModal = () => {
    setDeleteTypeVisible(false);
  };
  
  return (
    <div className='container-admin'>
      <div className='bordered-container'>
        <h1 className='h1'>Admin Page</h1>
        <div className='button-container'>
          <button
            className='button btn-outline-dark'
            onClick={openModal}
            onMouseEnter={(e) => { /* ... */ }}
            onMouseLeave={(e) => { /* ... */ }}
          >
            Add Type
          </button>
          <button
            className='button btn-outline-dark'
            onClick={openAddBookModal}
            onMouseEnter={(e) => { /* ... */ }}
            onMouseLeave={(e) => { /* ... */ }}
          >
            Add Book
          </button>
          <Link to='/adminorder' className='button btn-outline-dark'>
            Orders
          </Link>
          <button
  className='button btn-outline-danger'
  onClick={openDeleteBookModal}
>
  Delete Book
</button>
<button
  className='button btn-outline-danger'
  onClick={openDeleteTypeModal}
>
  Delete Type
</button>
{deleteTypeVisible && (
  <DeleteTypeModal show={deleteTypeVisible} onHide={closeDeleteTypeModal} />
)}


{deleteBookVisible && (
  <DeleteBookModal show={deleteBookVisible} onHide={closeDeleteBookModal} onDeleteConfirm={confirmDeleteBook} 
  />
)}

        </div>
      </div>
      {addBookVisible && (
        <CreateBook show={addBookVisible} onHide={closeAddBookModal} />
      )}

      {isModalOpen && (
        <CreateType show={isModalOpen} onHide={closeModal} />
      )}

    
    </div>
  );
};

export default Admin;