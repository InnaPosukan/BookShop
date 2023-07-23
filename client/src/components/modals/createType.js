import React, {useState} from "react";
import { createType } from "../../http/bookApi";

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState('')
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
            value={value}
            onChange={e => setValue(e.target.value)}
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
          <button type="button" className="btn btn-primary" onClick={addType}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateType;
// Import the 'api' variable from the correct file where it's defined
import { $authHost, $host } from "./index";

export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type');
  return data;
};
import React, { useContext, useEffect } from 'react';
import TypeBar from '../components/TypeBar';
import BookList from '../components/BookList';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchTypes } from '../http/bookApi';
// import UserStore from '../store/Userstore';

const Shop = observer (() => {
  const {book} = useContext(Context)
  useEffect(() =>{
    fetchTypes().then(data => book.setTypes(data))

  },[])
  const navigate = useNavigate();
  // const userStore = new UserStore(); 
  const isAdmin = true; 
  // const isAuth = userStore.isAuth;

  const handleAdminClick = () => {
    console.log('Navigating to admin route...');
    navigate(ADMIN_ROUTE);
  };

  return (
    <div className='btn1' style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          flex: '0 0 50px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {isAdmin && (
          <button
            onClick={handleAdminClick}
            style={{
              fontSize: '16px',
              backgroundColor: '#f9f9f9',
              border: '1px solid #ccc',
              marginRight: '23px',
              textAlign: 'center',
              marginTop: '15px',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
          >
            Add new item
          </button>
        )}
      </div>
      <div
        className='mt-2'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flex: '1 1 auto',
        }}
      >
        <div style={{ flex: '0 0 25%', backgroundColor: '#white' }}>
          <TypeBar />
        </div>
        <div
          style={{
            flex: '0 0 75%',
            backgroundColor: '#f9f9f9',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <BookList />
        </div>
      </div>
    </div>
  );
});

export default Shop;