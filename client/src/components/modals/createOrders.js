import React from "react";
import { useState } from "react";
import { createOrders } from "../../http/bookApi";
import { useCartData } from "../Context/CartDataContext";
const CreateOrders = ({ show, onHide }) => {
    const [first_name, setName] = useState("");
    const [last_name, setSurname] = useState("");
    const [phone_number, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const { cartDataId } = useCartData(); 
    const {  clearCart } = useCartData(); 

    const handleSaveChanges = async () => {
      const orderData = {
        cartDataId: cartDataId,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        address: address,
      };
    
      console.log("Order data:", orderData);
    
      try {
        const createdOrder = await createOrders(orderData); 
        console.log("Order created:", createdOrder);
        await clearCart(); 
        onHide();
      } catch (error) {
        console.error("Error creating order:", error);
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
    color: "#fff", 
  };

  return (
    <div style={modalStyles}>
    <div style={{ ...modalContentStyles }}>
      <h5 style={{ ...centerTextStyle }}>
        Add new order
      </h5>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyles}
        />
          <input
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setSurname(e.target.value)}
            style={inputStyles}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyles}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyles}
          />
         </div>
         <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ ...buttonStyles }}
                onClick={onHide}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ ...buttonStyles }}
                onClick={handleSaveChanges} // Вызываем функцию сохранения при нажатии на кнопку
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
    );
};

export default CreateOrders;


