import { useState, useEffect } from "react";
import "./myprofile.css";

const MyProfile = () => {
  const [user, setUser] = useState([]);
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
    getUser();
  }, []);
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>My Profile</h2>
        </div>
        <div className="profile-content">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* Add more user information as needed */}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
