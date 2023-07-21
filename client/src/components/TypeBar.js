import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const TypeBar = observer(() => {
  const { book } = useContext(Context);

  return (
    <ul className="list-group list-group-flush" style={{ marginLeft: "30px",marginTop:"10px", cursor: "pointer" }}>
      {book.types.map((type) => (
        <li
          key={type.id}
          onClick={() => book.setSelectedType(type)} 
          className="list-group-item"
          style={{
            backgroundColor: book.selectedType && book.selectedType.id === type.id ? "#FFF1A5" : "transparent"
          }}
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
});

export default TypeBar;
