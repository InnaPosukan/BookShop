import React, { useContext, useState } from "react";
import { Context } from "../..";

const CreateBook = ({ show, onHide }) => {
  const { book } = useContext(Context);
  const [selectedType, setSelectedType] = useState(null);
  const [bookName, setBookName] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookCover, setBookCover] = useState(null);
  const [info, setInfo] = useState([]);

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

  const closeButtonStyles = {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "24px",
    cursor: "pointer",
  };

  const centerTextStyle = {
    marginBottom: "15px",
    textAlign: "center",
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
  };

  const handleBookPriceChange = (event) => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(event.target.value) || event.target.value === "") {
      setBookPrice(event.target.value);
    }
  };

  const handleBookCoverChange = (event) => {
    const file = event.target.files[0];
    setBookCover(file);
  };

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const handleInfoChange = (index, key, value) => {
    const updatedInfo = [...info];
    updatedInfo[index][key] = value;
    setInfo(updatedInfo);
  };

  const removeInfo = (index) => {
    const updatedInfo = [...info];
    updatedInfo.splice(index, 1);
    setInfo(updatedInfo);
  };

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <div style={closeButtonStyles} onClick={onHide}>
          &times;
        </div>
        <h5 style={centerTextStyle}>Add new book</h5>
        <div style={{ marginBottom: "15px" }}>
          <h5>Select type</h5>
          {book.types.map((type) => (
            <label key={type.id} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="type"
                value={type.name}
                checked={selectedType === type.name}
                onChange={handleTypeChange}
              />
              {type.name}
            </label>
          ))}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="bookName">Book Name:</label>
          <input
            type="text"
            id="bookName"
            value={bookName}
            onChange={handleBookNameChange}
            placeholder="Enter book name"
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="bookPrice">Book Price:</label>
          <input
            type="text"
            id="bookPrice"
            value={bookPrice}
            onChange={handleBookPriceChange}
            pattern="[0-9]*"
            placeholder="Enter book price"
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="bookCover">Book Cover:</label>
          <input
            type="file"
            id="bookCover"
            accept="image/*"
            onChange={handleBookCoverChange}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <hr />
        <button variant="outline-dark" onClick={addInfo}>
          Add new property
        </button>
        {info.map((item, index) => (
          <div key={item.number}>
            <div style={{ marginBottom: "15px" }}>
              <label>Property Name:</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleInfoChange(index, "title", e.target.value)}
                placeholder="Enter property name"
                style={{ marginLeft: "10px" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Property Description:</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleInfoChange(index, "description", e.target.value)}
                placeholder="Enter property description"
                style={{ marginLeft: "10px" }}
              />
            </div>
            <button onClick={() => removeInfo(index)}>Delete Property</button>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginRight: "10px" }}
            onClick={onHide}
          >
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={onHide}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
