import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Journal from "./Pages/Journal/Journal";
import Partner from "./Pages/Partner/Partner";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup.jsx";
import Profile from "./components/Profile/Profile"; // Import Profile Component

const App = () => {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
