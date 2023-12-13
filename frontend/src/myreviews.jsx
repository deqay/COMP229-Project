import { useState, useEffect } from "react";
import "./myprofile.css";
import Axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarRating from "../src/assets/components/starreviews";

const MyReviews = () => {
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [review, setReview] = useState([]);

  const token1 = localStorage.getItem("token");

  const getUser = async () => {
    try {
      const response = await fetch(
        "https://vistara.onrender.com/api/users/me",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookies: `token = ${token1}`,
          },
          credentials: "include",
        }
      );

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
  const getReview = async (userId) => {
    try {
      const response = await Axios.get(
        `https://vistara.onrender.com/api/reviews/usersearch?searchString=${userId}`
      );
      setReview(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getProduct = async (productId) => {
    try {
      const response = await Axios.get(
        `https://vistara.onrender.com/api/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getUser();

    getProduct(productId);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (user._id) {
        await getReview(user._id);
      }
    };

    fetchData();
  }, [user]);
  const productId = review.map((review1) => review1.productId);

  const modifiedProduct = product.map((item) => ({
    _id: item._id,
    productName: item.name,
    description: item.description,
  }));
  const mapData = modifiedProduct.reduce((acc, obj) => {
    acc[obj._id] = obj;
    return acc;
  }, {});

  const processedData = review.map((obj) => ({
    ...mapData[obj.productId],
    ...obj,
  }));
  console.log("re", review);
  console.log("pd", processedData);

  const handleDelete = async (reviewId, userId) => {
    try {
      const response = await fetch(
        `https://vistara.onrender.com/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookies: `token = ${token1}`,
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        getReview(userId);
        // Successfully deleted
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  return (
    <div>
      <h2>My reviews</h2>
      <Grid container spacing={3}>
        {processedData.map((business) => (
          <Grid item xs={12} sm={6} md={4} key={business._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {business.productName}
                </Typography>
                <div className="star-rating-wrapper">
                  <StarRating value={business.rating} />
                </div>

                <Typography variant="body2" color="text.secondary">
                  {business.comment}
                </Typography>
                <button
                  onClick={() => handleDelete(business._id, business.userId)}
                >
                  Delete Review
                </button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyReviews;
