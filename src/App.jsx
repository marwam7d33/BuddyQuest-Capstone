import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import HabitTracker from "./pages/HabitTracker/HabitTracker";
import Journal from "./pages/Journal/Journal";
// import Partners from "./pages/Partners";

function App() {
  return (
    <Router>
      <Routes>
        {/* first thing -- show habits from 'Home', <Link> to Journal */}
        <Route path="/" element={<Home />} />


        {/* do these next...  */}
        <Route path="/journal" element={<Journal />} />

        {/* <Route path="/partners" element={<Partners />} /> */}


        {/* revisit this one.. */}
        {/* <Route path="/habits/:id" element={<HabitTracker />} /> */}

        {/* do these last... */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
