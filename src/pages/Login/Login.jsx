import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome
import { faGoogle } from "@fortawesome/free-brands-svg-icons"; // Import Google icon
import "./Login.scss"; // Import styles

const BASE_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (

    <div className="login__wrapper">
      <div className="login">
        <h2 className="login__title">Hello again! Ready to dive back in?</h2>
        <form className="login__form" onSubmit={handleLogin}>
          <input
            className="login__form-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="login__form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login__form-button" type="submit">
            Login
          </button>
        </form>
        {error && <p className="login__error">{error}</p>}
        <a
          href="http://localhost:8080/auth/google"
          className="login__google-button"
        >
          <FontAwesomeIcon icon={faGoogle} className="login__google-icon" />
          Sign in with Google
        </a>
        <p className="login__register">
          Don't have an account?{" "}
          <Link to="/signup" className="login__register-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
