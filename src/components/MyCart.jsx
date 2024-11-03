import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdDelete } from "react-icons/md"; // Importing trash icon

const MyCart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Function to update item quantity
  const updateItemQuantity = (item, change) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        const newQuantity = Math.max(1, (cartItem.quantity || 1) + change); // Ensure quantity doesn't go below 1
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  // Calculate total amount
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1), // Ensure quantity defaults to 1
    0
  );

  // Function to remove item from cart
  const removeFromCart = (itemToRemove) => {
    setCart(cart.filter((item) => item.id !== itemToRemove.id)); // Remove item by filtering out the one to remove
  };

  return (
    <div className="container mt-4">
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="dLeft">
            <ul className="list-group">
              {cart.map((item, index) => (
                <li className="list-group-item" key={index}>
                  <div className="box">
                    <div className="divleft">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "100px" }}
                      />
                      <div className="col_2">
                        <h5>{item.title}</h5>
                        <p>Price: ₹{item.price}</p>
                      </div>
                    </div>
                    <div className="divright">
                      <div className="d-flex align-items-center mt-2 quantity">
                        <button
                          className="btn btn-secondary me-2"
                          onClick={() => updateItemQuantity(item, -1)} // Decrease quantity
                        >
                          -
                        </button>
                        <span>{item.quantity || 1}</span>{" "}
                        {/* Display quantity */}
                        <button
                          className="btn btn-secondary ms-2"
                          onClick={() => updateItemQuantity(item, 1)} // Increase quantity
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-danger mt-2 ms-2"
                        onClick={() => removeFromCart(item)} // Call remove function
                        aria-label={`Remove ${item.title} from cart`} // Improved accessibility
                      >
                        <MdDelete size={20} /> {/* Trash icon */}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="dRight">
            <h3 className="mt-4">Total Amount: ₹{totalAmount}</h3>
            <Link to="/UserDetails" className="btn btn-primary mt-5">
              Place Order
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCart;
