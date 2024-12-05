import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Journal from "./pages/Journal/Journal.jsx";
import Matchmaking from "./pages/MatchmakingPage/MatchmakingPage.jsx";
import SimpleBottomNavigation from "./components/SimpleBottomNavigation/SimpleBottomNavigation";
import StreaksPage from "./pages/StreaksPage/StreaksPage.jsx";



const App = () => {
  const [bottomNavValue, setBottomNavValue] = useState(0);

  // Assuming HabitTracker manages the habits state
  const [habits, setHabits] = useState([
    // Example habits, replace with actual data or API calls
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
