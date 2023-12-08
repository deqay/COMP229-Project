// FeaturedBusiness.js
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarRating from "../../assets/components/starreviews";
import { UserContext } from "../../App";
import Axios from "axios";
const FeaturedBusiness = () => {
  const { state } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [review, setReview] = useState([]);

  const getData = async () => {
    try {
      const response = await Axios.get("http://localhost:8080/api/products");
      setData(response.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getReview = async (productId) => {
    try {
      const response = await Axios.get(
        `http://localhost:8080/api/reviews/search?searchString=${productId}`
      );
      setReview(response.data);
      console.log(response.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();

    getReview(productId);
  }, []);
  const productId = data.map((dataa) => dataa._id);
  const ratingMap = review.reduce((acc, review) => {
    const { productId, rating } = review;

    
    if (!acc[productId]) {
      acc[productId] = { total: 0, count: 0 };
    }

    
    acc[productId].total += rating;
    acc[productId].count += 1;

    return acc;
  }, {});

  
  const averageRatings = Object.keys(ratingMap).reduce((acc, productId) => {
    const average = ratingMap[productId].total / ratingMap[productId].count;
    acc.push({ productId, average });
    return acc;
  }, []);

  const mapData = data.reduce((acc, obj) => {
    acc[obj._id] = obj;
    return acc;
  }, {});

  const processedData = averageRatings.map((obj) => ({
    ...mapData[obj.productId], 
    ...obj, 
  }));

  console.log(processedData);

  return (
    <div>
      <h2>Featured Businesses</h2>
      <Grid container spacing={3}>
        {processedData.map((business) => (
          <Grid item xs={12} sm={6} md={4} key={business._id}>
            <Card>
              <img
                src={business.photo}
                alt={business.name}
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {business.name}
                </Typography>
                <StarRating value={business.average} />
                <Typography variant="body2" color="text.secondary">
                  {business.description}
                </Typography>
     
                {state ? (
                  <Link to={`/write-review/${business._id}`}>
                    Write a Review
                  </Link>
                ) : (
                  <Link to="/signin">Sign in to Write a Review</Link>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FeaturedBusiness;
