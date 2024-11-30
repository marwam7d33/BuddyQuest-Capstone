import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; //

import "./Signup.scss";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send signup request to the backend
      await axios.post("http://localhost:8080/auth/signup", {
        username,
        password,
      });
      // Navigate to the login page after successful signup
      navigate("/login"); // Use navigate() to redirect to login page
    } catch (err) {
      setError("Error signing up"); // Handle signup failure
    }
  };

  return (
    <section className="signup__wrapper">
      <div className="signup">
        <h2 className="signup__title">Signup</h2>
        <form className="signup__form" onSubmit={handleSignup}>
          <input
            type="text"
            className="signup__form-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="signup__form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signup__form-button">
            Sign Up
          </button>
        </form>

        {error && <p className="signup__error">{error}</p>}

        <div className="signup__social">
          <button
            className="signup__social-button signup__social-button--google"
            onClick={() =>
              (window.location.href = "http://localhost:8080/auth/google")
            }
          >
            Sign Up with Google
          </button>
        </div>

        <div className="signup__link">
          <p>
            Have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
