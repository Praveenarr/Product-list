import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap
import axios from "axios"; // Import Axios for making HTTP requests

const UserDetails = ({ cart }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // New state for phone number
  const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility
  const [orderPlaced, setOrderPlaced] = useState(false); // State to manage order placement
  const [responseMessage, setResponseMessage] = useState(""); // State for the server response message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare order details
    const orderDetails = {
      name,
      address,
      email,
      phone, // Include phone number in the order details
      items: cart,
    };

    // Log the order details before sending the request
    console.log("Order Details: ", orderDetails);

    try {
      // Send order details to the server
      const response = await axios.post(
        "http://localhost:3502/confirm-product",
        orderDetails
      );
      console.log(response.data); // Handle the response from the server
      setResponseMessage(response.data.message); // Set the response message
      setOrderPlaced(true); // Update the state to indicate that the order was placed
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("An error occurred while placing your order. Please try again.");
    } finally {
      setShowPopup(true); // Show the popup with order details
    }
  };

  return (
    <div className="container mt-4">
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Delivery Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* Popup Message */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {orderPlaced ? "Order Placed!" : "Order Confirmation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Your Order Details</h5>
          <p>Name: {name}</p>
          <p>Delivery Address: {address}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p> {/* Display phone number */}
          <h6>Items Ordered:</h6>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - ₹{item.price}
              </li>
            ))}
          </ul>
          {orderPlaced && <p>{responseMessage}</p>}{" "}
          {/* Display the response message */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDetails;
