import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/profile", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setUser(response.data.profile); // Set user data
      } catch (err) {
        console.error("Error fetching user profile:", err);
        // If the user is not logged in or session has expired, redirect to login
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      {/* Assuming email exists in the user object */}
      <p>Email: {user.email || "No email available"}</p>
      <button
        onClick={async () => {
          try {
            await axios.post(
              "http://localhost:8080/auth/logout",
              {},
              { withCredentials: true }
            );
            navigate("/login"); // Redirect to login after logout
          } catch (err) {
            console.error("Error logging out:", err);
          }
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
