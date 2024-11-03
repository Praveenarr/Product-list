import React from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  categoryFilter,
  setCategoryFilter,
  cartItemCount,
}) => {
  return (
    <>
      {/* Navbar */}

      <nav className="navbar navbar-light bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            E-Shop
          </Link>
          <form className="d-flex input-group w-auto">
            <div className="search">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
            <div className="filter">
              <select
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="form-select me-2"
                value={categoryFilter}
              >
                <option value="">All Categories</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="shoes">Shoes</option>
                <option value="smartphone">Smartphone</option>
                <option value="audio">Audio</option>
                <option value="laptop">Laptop</option>
                <option value="smart home">Smart Home</option>
                <option value="gaming">Gaming</option>
                <option value="beauty">Beauty</option>
              </select>
            </div>
            <div className="sort">
              <select
                onChange={(e) => setSortOrder(e.target.value)}
                className="form-select me-2"
                value={sortOrder}
              >
                <option value="asc">Sort by Price (Low to High)</option>
                <option value="desc">Sort by Price (High to Low)</option>
              </select>
            </div>
            <div className="cart">
              {/* My Cart Button with Icon and Count */}
              <Link to="/MyCart" className="mycart">
                <button className="btn btn-outline-info position-relative">
                  <BsCart className="me-1" /> My Cart
                  {cartItemCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {cartItemCount}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Nav;
