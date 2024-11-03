import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Enter_Form from "./components/Enter_Form";
import Edit_Form from "./components/Edit_Form";
import MyCart from "./components/MyCart"; // Import the MyCart component
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import UserDetails from "./components/UserDetails";

function App() {
  const [details, setdetails] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : []; // Initialize cart from local storage or as empty array
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to local storage whenever it changes
  }, [cart]);

  const filteredDetails = Array.isArray(details)
    ? details.filter((detail) => {
        const matchesCategory = categoryFilter
          ? detail.category === categoryFilter
          : true;
        const matchesSearchTerm = detail.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearchTerm;
      })
    : []; // Use an empty array if details is not an array

  const sortedDetails = [...filteredDetails].sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedDetails.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(sortedDetails.length / itemsPerPage);

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]); // Add item to cart
  };

  return (
    <div>
      <BrowserRouter>
        <Nav
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          cartItemCount={cart.length}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Enter_Form
                details={details}
                setdetails={setdetails}
                highlightText={highlightText}
                paginate={paginate}
                currentProducts={currentProducts}
                currentPage={currentPage} // Pass currentPage
                totalPages={totalPages} // Pass totalPages
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                addToCart={addToCart} // Pass addToCart function
              />
            }
          />
          <Route
            path="/EditForm/:id"
            element={<Edit_Form details={details} setdetails={setdetails} />}
          />
          <Route
            path="/mycart"
            element={<MyCart cart={cart} setCart={setCart} />} // Pass cart and setCart here
          />
          <Route
            path="/UserDetails"
            element={<UserDetails cart={cart} setCart={setCart} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
