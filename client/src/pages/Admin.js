import React, { useState } from 'react';
import CreateType from '../components/modals/createType';
import CreateBook from '../components/modals/createBook';

const Admin = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [addBookVisible, setAddBookVisible] = useState(false);

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

  return (
    <div className="d-flex flex-column">
      <a href="#" className="mt-4 p-2 btn btn-outline-dark" onClick={openModal}>
        Add type
      </a>
      <a href="#" className="mt-4 p-2 btn btn-outline-dark" onClick={openAddBookModal}>
        Add book
      </a>

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
