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

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <div style={closeButtonStyles} onClick={onHide}>
          &times;
        </div>
        <h5 style={centerTextStyle}>Add new type</h5>
        <div>
          <input
            type="text"
            placeholder="Input type"
            style={{
              padding: "8px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "15px",
            }}
          />
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
          <button type="button" className="btn btn-primary" onClick={onHide}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateType;
