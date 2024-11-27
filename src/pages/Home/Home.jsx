import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.scss"; // SCSS for styling
import HabitTracker from "../HabitTracker/HabitTracker";

const Home = () => {
  const navigate = useNavigate();
  const [mood, setMood] = useState("");

  const handleEmojiClick = (selectedMood) => {
    setMood(selectedMood);
    navigate("/journal");
  };

  return (
    <div className="home">
      <h1 className="home__title">BuddyQuest</h1>
      <p>Team up, conquer habits, and achieve goals together!</p>
      <HabitTracker />

      {/* Mood Selector Section */}
      <div className="home__mood">
        <h2 className="home__mood-title">How are you feeling today?</h2>
        <div className="home__emoji-container">
          {[
            { mood: "happy", emoji: "😊", label: "Happy" },
            { mood: "neutral", emoji: "😐", label: "Neutral" },
            { mood: "sad", emoji: "😢", label: "Sad" },
            { mood: "angry", emoji: "😡", label: "Angry" },
            { mood: "excited", emoji: "🤩", label: "Excited" },
          ].map(({ mood, emoji, label }) => (
            <span
              key={mood}
              className={`home__emoji home__emoji--${mood}`}
              onClick={() => handleEmojiClick(mood)}
              role="img"
              aria-label={label}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Partner Section */}
      <div className="home__partner">
        <h2 className="home__section-title">Partner with a Friend</h2>
        <p className="home__section-description">
          Find friends with similar habits and start exciting challenges
          together!
        </p>
        <Link to="/partner">
          <button className="home__button home__button--secondary">
            Partner Now
          </button>
        </Link>
      </div>

      {/* Chat Section */}
      <div className="home__chat">
        <h2 className="home__section-title">Chat with Partners</h2>
        <p className="home__section-description">
          Stay connected with your partners and share your progress.
        </p>
        <div className="home__chat-bubble">
          <Link to="/chat" className="home__chat-link">
            💬
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
