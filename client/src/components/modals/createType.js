import React from "react";

const CreateType = ({ show, onHide }) => {
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
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    maxWidth: "314px",
    width: "80%",
    maxHeight: "240px"
  };

  const centerTextStyle = {
    marginBottom: "15px",
    textAlign: "center",
    color: "#333",
    fontSize: "18px",
  };

  const inputStyles = {
    padding: "12px",
    width: "100%",
    border: "2px solid #ccc",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "16px",
    outline: "none",
  };

  const buttonStyles = {
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "none",
    marginRight: "10px",
    border: "none", // Remove button border
  };

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h5 style={centerTextStyle}>Add new type</h5>
        <div>
          <input
            type="text"
            placeholder="Input type"
            style={inputStyles}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ ...buttonStyles, backgroundColor: "#eee", color: "#333" }}
            onClick={onHide}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ ...buttonStyles, backgroundColor: "#FFA500", color: "#fff" }} // Updated to orange (#FFA500)
            onClick={onHide}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateType;
