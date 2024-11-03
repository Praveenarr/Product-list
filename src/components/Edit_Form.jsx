import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

const EditForm = () => {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0); // State to store the random rating

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/endpoint`);
        const foundProduct = response.data.endpoint.find(
          (item) => item.id === parseInt(id)
        );
        setProduct(foundProduct);

        // Generate a random rating between 0 and 5
        setRating(Math.floor(Math.random() * 6));
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Show loading state while product is being fetched
  }

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      return (
        <span
          key={index}
          className={index < rating ? "filled-star" : "empty-star"}
        >
          ★
        </span>
      );
    });
  };

  // Function to format special features
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

  return (
    <div className="container mt-4">
      <h2>Product Details</h2>
      <div className="card mt-5">
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p className="card-text">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="card-text">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="card-text">
            <strong>Ratings:</strong> {renderStars(rating)}{" "}
          </p>
          <p className="card-text">
            <strong>Special Features:</strong>{" "}
            {formatSpecialFeatures(product.special_features)}
          </p>
          <img
            src={product.image}
            alt={product.title}
            style={{ height: "200px", objectFit: "cover" }}
            className="img-fluid mt-3"
          />
        </div>
      </div>
      <Link to="/" className="btn btn-secondary mt-5">
        Back to Products
      </Link>
    </div>
  );
};

export default EditForm;
