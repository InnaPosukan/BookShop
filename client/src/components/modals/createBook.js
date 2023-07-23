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
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
  };

  const closeButtonStyles = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
  };

  const centerTextStyle = {
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "24px",
    color: "#333",
  };

  const labelStyles = {
    display: "block",
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  };

  const inputStyles = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  };

  const addInfoButtonStyles = {
    backgroundColor: "#42b983",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  };

  const deleteButtonStyles = {
    ...addInfoButtonStyles,
    backgroundColor: "#ff5a5a",
  };

  const saveButtonStyles = {
    backgroundColor: "#FAA90C",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "12px 25px",
    cursor: "pointer",
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

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const deleteButtonContainerStyles = {
    ...containerStyles,
    justifyContent: "center",
  };

  const scrollableContainerStyles = {
    maxHeight: "80vh", // Adjust this value as needed to control the maximum height of the scrollable area
    overflowY: "auto",
    padding: "0 10px",
  };

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <div style={closeButtonStyles} onClick={onHide}>
          &times;
        </div>
        <h5 style={centerTextStyle}>Add New Book</h5>
        <label style={labelStyles}>Select Type:</label>
        <div style={{ marginBottom: "20px" }}>
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
        <label style={labelStyles}>Book Name:</label>
        <input
          type="text"
          value={bookName}
          onChange={handleBookNameChange}
          placeholder="Enter book name"
          style={inputStyles}
        />
        <label style={labelStyles}>Book Price:</label>
        <input
          type="text"
          value={bookPrice}
          onChange={handleBookPriceChange}
          pattern="[0-9]*"
          placeholder="Enter book price"
          style={inputStyles}
        />
        <label style={labelStyles}>Book Cover:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleBookCoverChange}
          style={inputStyles}
        />
        <hr />
        <div style={scrollableContainerStyles}>
          <div style={containerStyles}>
            <button style={addInfoButtonStyles} onClick={addInfo}>
              Add New Property
            </button>
          </div>
          {info.map((item, index) => (
            <div key={item.number} style={{ marginBottom: "20px" }}>
              <label style={labelStyles}>Property Name:</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleInfoChange(index, "title", e.target.value)}
                placeholder="Enter property name"
                style={inputStyles}
              />
              <label style={labelStyles}>Property Description:</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleInfoChange(index, "description", e.target.value)}
                placeholder="Enter property description"
                style={inputStyles}
              />
              <div style={deleteButtonContainerStyles}>
                <button style={deleteButtonStyles} onClick={() => removeInfo(index)}>
                  Delete Property
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginRight: "10px" }}
            onClick={onHide}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={saveButtonStyles}
            onClick={onHide}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;