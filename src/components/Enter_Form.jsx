import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api"; // Adjust the import based on your project structure
import "bootstrap/dist/css/bootstrap.min.css";
import { MdShoppingCart } from "react-icons/md";

const Enter_Form = ({
  setdetails,
  highlightText,
  paginate,
  currentProducts,
  currentPage,
  totalPages,
  addToCart,
}) => {
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState({});
  const [showDescription, setShowDescription] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const renderStars = (rating) => {
    const roundedRating = Math.round(Number(rating));
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={index < roundedRating ? "filled-star" : "empty-star"}
      >
        ★
      </span>
    ));
  };

  const getdata = async () => {
    setLoading(true);
    try {
      const response = await api.get("/endpoint");
      console.log("API Response:", response.data); // Log API response
      // setdetails(response.data); // Ensure you're setting the array for json server
      setdetails(response.data.endpoint); // Ensure you're setting the array for node server
    } catch (error) {
      console.error("Error fetching data:", error);
      alertify.notify(
        "An error occurred while fetching products. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const formatSpecialFeatures = (features) => {
    if (Array.isArray(features)) {
      return features.join(", ");
    } else if (typeof features === "string") {
      return features
        .split(",")
        .map((feature) => feature.trim())
        .join(", ");
    } else {
      return "No special features available";
    }
  };

  const handleAddToCart = (item) => {
    if (!addedItems[item.id]) {
      addToCart(item);
      setAddedItems((prev) => ({ ...prev, [item.id]: true }));
      alertify.success(`${item.title} has been added to your cart!`);
    }
  };

  const toggleDescription = (id) => {
    setShowDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <div className="container mt-4 mb-4">
        <h1>Products</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="row mt-5">
            {currentProducts.length > 0 ? (
              currentProducts.map((detail) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 mb-4"
                  key={detail.id}
                  onMouseEnter={() => setHoveredCard(detail.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="card-body">
                    <div className="item">
                      <div className="img">
                        <img
                          src={detail.image}
                          className="card-img-top"
                          alt={detail.title}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </div>
                      <p className="ratings">
                        {renderStars(detail.rate)} ( {detail.count} )
                      </p>

                      <h5 className="card-title text-center">
                        {highlightText(detail.title)}
                      </h5>
                      <p className="card-text price">
                        <span> Price: ${detail.price} </span>
                        <span>
                          <button
                            className="btn"
                            onClick={() => handleAddToCart(detail)}
                            aria-label={`Add ${detail.title} to cart`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "45px",
                              height: "45px",
                              borderRadius: "8px",
                              background: addedItems[detail.id]
                                ? "green"
                                : hoveredCard === detail.id
                                ? "red"
                                : "#eef1f6",
                              color: addedItems[detail.id]
                                ? "white"
                                : hoveredCard === detail.id
                                ? "white"
                                : "#0e58c7",
                              border: "none",
                              cursor: addedItems[detail.id]
                                ? "default"
                                : "pointer",
                              pointerEvents: addedItems[detail.id]
                                ? "none"
                                : "auto",
                            }}
                            disabled={addedItems[detail.id]}
                          >
                            <MdShoppingCart size={20} />
                          </button>
                        </span>
                      </p>
                      <p
                        className={`card-text ${
                          showDescription[detail.id]
                            ? ""
                            : "truncated-description hide"
                        }`}
                      >
                        {detail.description}
                      </p>
                    </div>

                    <div className="details">
                      <p className="card-text">Category: {detail.category}</p>
                      <p className="card-text">
                        <strong>Special Features:</strong>{" "}
                        {formatSpecialFeatures(detail.special_features)}
                      </p>
                      <Link
                        to={`/EditForm/${detail.id}`}
                        className="card h-100 text-decoration-none"
                      >
                        <button className="btn btn-primary">
                          More Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-secondary"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Enter_Form;
