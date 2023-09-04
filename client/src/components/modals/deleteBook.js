import React, { useState } from "react";
import { deleteBookById } from "../../http/bookApi";

const DeleteBookModal = ({ show, onHide }) => {
  const [bookId, setBookId] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const deleteBook = async () => {
    try {
      await deleteBookById(bookId);
      setSuccessMessage('Book deleted successfully.');
      setErrorMessage('');
      setBookId('');
      onHide();
      window.alert("Book deleted successfully."); // Show alert here

    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Invalid Book ID.');
      console.error('Error deleting book:', error);
    }
  };
  const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: show ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const modalContentStyles = {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
  };

  const centerTextStyle = {
    marginBottom: "15px",
    textAlign: "center",
  };

  const inputStyles = {
    padding: "8px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "15px",
    fontSize: "16px",
  };

  const buttonStyles = {
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    textTransform: "none",
    marginRight: "10px",
    border: "none",
    backgroundColor: "#6C757D",
    color: "#fff", 
  };

  return (
    <div style={modalStyles}>
      <div style={{ ...modalContentStyles, ...{ maxHeight: "240px" } }}>
        <h5 style={{ ...centerTextStyle, ...{ color: "#333", fontSize: "18px" } }}>
          Delete Book
        </h5>
        <div>
          <input
            type="text"
            placeholder="Enter Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            style={inputStyles}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ ...buttonStyles, ...{ backgroundColor: "#6C757D", color: "#fff" } }}
            onClick={onHide}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            style={{ ...buttonStyles }}
            onClick={deleteBook}
          >
            Delete Book
          </button>
        </div>
        {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default DeleteBookModal;