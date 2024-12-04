import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Journal from "./pages/Journal/Journal.jsx";
import Matchmaking from "./pages/MatchmakingPage/MatchmakingPage.jsx";
import SimpleBottomNavigation from "./components/SimpleBottomNavigation/SimpleBottomNavigation";

const App = () => {
  const [bottomNavValue, setBottomNavValue] = useState(0);

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
