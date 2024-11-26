import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.scss"; // Optional, for SCSS styling specific to the homepage
import HabitTracker from "../HabitTracker/HabitTracker";

const Home = () => {
  const navigate = useNavigate(); // For programmatic navigation
  const [mood, setMood] = useState("");

  const handleEmojiClick = (selectedMood) => {
    setMood(selectedMood); // Optional: Set the mood for display or future use
    navigate("/journal"); // Navigate to the journal page
  };

  return (
    <div className="home-page">
      <h1>Welcome to Your Habit Tracker</h1>
      <HabitTracker />

      <div className="mood-selection">
        <h2>How are you feeling today?</h2>
        <div className="emoji-container">
          <span
            onClick={() => handleEmojiClick("happy")}
            role="img"
            aria-label="Happy"
          >
            😊
          </span>
          <span
            onClick={() => handleEmojiClick("neutral")}
            role="img"
            aria-label="Neutral"
          >
            😐
          </span>
          <span
            onClick={() => handleEmojiClick("sad")}
            role="img"
            aria-label="Sad"
          >
            😢
          </span>
          <span
            onClick={() => handleEmojiClick("angry")}
            role="img"
            aria-label="Angry"
          >
            😡
          </span>
          <span
            onClick={() => handleEmojiClick("excited")}
            role="img"
            aria-label="Excited"
          >
            🤩
          </span>
        </div>
      </div>

      <div>
        <Link to="/journal">
          <button>Go to Journal</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
