import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Journal from "./Pages/Journal/Journal"; // Import the Journal component
import Partner from "./Pages/Partner/Partner";
import "./App.scss";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/Partner" element={<Partner />} />
      </Routes>
    </Router>
  );
};

export default App;
