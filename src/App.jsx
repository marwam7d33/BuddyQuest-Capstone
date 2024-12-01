import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Journal from "./Pages/Journal/Journal";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup.jsx";
import Profile from "./components/Profile/Profile"; // Import Profile Component
import MatchmakingPage from "./Pages/MatchmakingPage/MatchmakingPage.jsx"; // Import MatchmakingPage component
import SimpleBottomNavigation from "./components/SimpleBottomNavigation/SimpleBottomNavigation.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/matchmaking" element={<MatchmakingPage />} />{" "}
        {/* Add the matchmaking page route */}
      </Routes>
      {/* Bottom Navigation */}
      <div className="home__bottom-nav">
        <SimpleBottomNavigation />
      </div>
    </Router>
  );
};

export default App;
