import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Journal from "./pages/Journal/Journal.jsx";
import Matchmaking from "./pages/MatchmakingPage/MatchmakingPage.jsx";
import SimpleBottomNavigation from "./components/SimpleBottomNavigation/SimpleBottomNavigation";
import StreaksPage from "./pages/StreaksPage/StreaksPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";

const App = () => {
  const [bottomNavValue, setBottomNavValue] = useState(0);

  const [habits, setHabits] = useState([
    { name: "Exercise", completed: true, date: "2024-12-04" },
    { name: "Meditation", completed: false, date: "2024-12-03" },
    { name: "Reading", completed: true, date: "2024-12-02" },
  ]);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home setBottomNavValue={setBottomNavValue} />}
          />
          <Route path="/journal" element={<Journal />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/streak" element={<StreaksPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <SimpleBottomNavigation
          bottomNavValue={bottomNavValue}
          setBottomNavValue={setBottomNavValue}
        />
      </div>
    </Router>
  );
};

export default App;
