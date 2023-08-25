import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import "./TypeBar.css"; 

const TypeBar = observer(() => {
  const { book } = useContext(Context);

  return (
    <ul className="list-group list-group-flush">
      {book.types.map((type) => (
        <li
          key={type.id}
          onClick={() => book.setSelectedType(type)} 
          className="list-group-item"
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
});

export default TypeBar;
