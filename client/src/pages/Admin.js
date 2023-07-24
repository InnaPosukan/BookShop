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

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '600px',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const borderedContainerStyles = {
    border: '2px solid #343a40',
    padding: '20px',
    borderRadius: '8px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const h1Styles = {
    fontSize: '36px',
    marginBottom: '20px',
  };

  const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const buttonStyles = {
    margin: '8px',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease', // Add the transition effect for background color change
  };

  const btnOutlineDarkStyles = {
    color: '#343a40',
    backgroundColor: 'transparent',
    border: '2px solid #343a40',
  };

  const btnOutlineDarkHoverStyles = {
    backgroundColor: '#faa90c', // Highlight color on hover (#FAA90C)
    color: '#343a40', // Text color (#343a40)
  };

  return (
    <div style={containerStyles}>
      <div style={borderedContainerStyles}>
        <h1 style={h1Styles}>Admin Page</h1>
        <div style={buttonContainerStyles}>
          <button
            style={{ ...buttonStyles, ...btnOutlineDarkStyles }}
            onClick={openModal}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = btnOutlineDarkHoverStyles.backgroundColor;
              e.target.style.color = btnOutlineDarkHoverStyles.color;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = btnOutlineDarkStyles.backgroundColor;
              e.target.style.color = btnOutlineDarkStyles.color;
            }}
          >
            Add Type
          </button>
          <button
            style={{ ...buttonStyles, ...btnOutlineDarkStyles }}
            onClick={openAddBookModal}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = btnOutlineDarkHoverStyles.backgroundColor;
              e.target.style.color = btnOutlineDarkHoverStyles.color;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = btnOutlineDarkStyles.backgroundColor;
              e.target.style.color = btnOutlineDarkStyles.color;
            }}
          >
            Add Book
          </button>
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