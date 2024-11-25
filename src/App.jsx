import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HabitTracker from "./pages/HabitTracker";
import Journal from "./pages/Journal";
import Partners from "./pages/Partners";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/habits" element={<HabitTracker />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
    </Router>
  );
}

export default App;
