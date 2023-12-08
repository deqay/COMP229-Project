// WriteReview.jsx
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Axios from "axios";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import { UserContext } from "../src/App";
import StarRating from "./assets/components/starreviews";
import "/Users/deqay/Desktop/projectpart1/frontend/src/review.css";
Axios.defaults.withCredentials = true;

const WriteReview = () => {
  const { state } = useContext(UserContext);
  const { businessId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [product, setProduct] = useState([]);
  const [review, setReview] = useState([]);
  const [user, setUser] = useState([]);

  const getProduct = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8080/api/products/${businessId}`
      );
      setProduct(response.data);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getReview = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8080/api/reviews/search?searchString=${businessId}`
      );
      setReview(response.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", 
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    getProduct();
    getReview();
    getUser();
  }, []);

  console.log("user:", user._id);

  const ratings = review.map((review) => review.rating);
  const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
  const averageRating = totalRating / ratings.length;

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const productId = businessId;
    const name = user.name;
    const userId = user._id;

    const reviewData = {
      userId,
      productId,
      name,
      comment,
      rating,
    };

    try {
      const response = await fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        console.log("Review submitted successfully");
        
        setComment("");
        setRating(0);
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  
  return (
    <div className="write-review-container">
      <h2>Write a Review</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <div className="product-info">
            <img
              src={product.photo}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <StarRating value={averageRating} />
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className="review-grid">
        {review.map((content) => (
          <div className="review-item" key={content._id}>
            <h4>{content.name}</h4>
            <p>{content.comment}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group"></div>
        <div className="form-group">
          <label htmlFor="reviewDescription">Comment:</label>
          <textarea
            id="reviewDescription"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stars">Rating:</label>
          <StarRating
            value={rating}
            onChange={(newStars) => setRating(newStars)}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default WriteReview;