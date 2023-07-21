import React from "react";
import { useNavigate } from "react-router-dom";
import { BOOKPAGE_ROUTE } from "../utils/consts";

const BookItem = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(BOOKPAGE_ROUTE + '/' + book.id);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        flex: "0 0 20%",
        padding: "10px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        marginTop:"10px"
      }}
    >
      <div
        style={{ 
          width: 220,
          height: 200,
          cursor: "pointer",
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={book.img}
          alt={book.title}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
          <div style={{ marginTop: "5px" }}>
        kldmls
      </div>
        <div style={{ fontWeight: "bold" }}>{book.title}</div>
        <div style={{ marginLeft: "-10px" }}>
          {book.rating}
        </div>
      </div>
    
    </div>
  );
};

export default BookItem;
