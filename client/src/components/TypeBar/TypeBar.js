// components/TypeBar.js

import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import "./TypeBar.css"; 
import { decode as jwt_decode } from 'jsonwebtoken';

const TypeBar = observer(() => {
  const { book, user } = useContext(Context);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token'); 
    console.log('User Token:', storedToken); 

    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwt_decode(storedToken);
      const userRole = decodedToken.role;

      console.log('User Role:', userRole); 
      user.setRole(userRole);

      setIsAdmin(userRole === 'ADMIN');
    }
  }, [user.role]);

  return (
    <div>
      {isAdmin && (
        <div className="admin-info">
          <ul className="list-group list-group-flush">
            {book.types.map((type) => (
              <li
                key={type.id}
                onClick={() => book.setSelectedType(type)} 
                className="list-group-item"
              >
                {type.name} (ID: {type.id})
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isAdmin && (
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
      )}
    </div>
  );
});

export default TypeBar;

