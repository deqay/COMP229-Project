// StarRating.jsx
import React from "react";

const StarRating = ({ value, onChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{ cursor: "pointer", color: star <= value ? "gold" : "gray" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
