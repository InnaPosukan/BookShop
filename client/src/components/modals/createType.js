import React, { useState } from "react";
import { createType } from "../../http/bookApi";

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState('');

  const addType = async () => {
    try {
      await createType({ name: value });
      setValue('');
      onHide();
    } catch (error) {
      console.error('Error saving data:', error);
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
    color: "#fff", // Set text color to white
  };

  return (
    <div style={modalStyles}>
      <div style={{ ...modalContentStyles, ...{ maxHeight: "240px" } }}>
        <h5 style={{ ...centerTextStyle, ...{ color: "#333", fontSize: "18px" } }}>
          Add new type
        </h5>
        <div>
          <input
            type="text"
            placeholder="Input type"
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
            className="btn btn-primary"
            style={{ ...buttonStyles, ...{ backgroundColor: "#FFA500" } }} // Updated to orange (#FFA500)
            onClick={addType}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateType;
