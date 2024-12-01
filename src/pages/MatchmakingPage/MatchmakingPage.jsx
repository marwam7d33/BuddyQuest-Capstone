import React, { useState } from "react";
import "./MatchmakingPage.scss";

const MatchmakingPage = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      location: "New York",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=John",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      location: "San Francisco",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Jane",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      location: "Chicago",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Mike",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      location: "Boston",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Sarah",
    },
  ]);

  const [habits] = useState([
    {
      id: 1,
      user_id: 1,
      name: "Morning Exercise",
      category: "Fitness",
      icon: "🏋️",
    },
    {
      id: 2,
      user_id: 1,
      name: "Reading",
      category: "Personal Development",
      icon: "📖",
    },
    { id: 3, user_id: 2, name: "Meditation", category: "Wellness", icon: "🧘" },
    { id: 4, user_id: 2, name: "Yoga", category: "Fitness", icon: "🤸" },
    {
      id: 5,
      user_id: 3,
      name: "Coding",
      category: "Professional Development",
      icon: "💻",
    },
    { id: 6, user_id: 3, name: "Running", category: "Fitness", icon: "🏃" },
    { id: 7, user_id: 4, name: "Cooking", category: "Lifestyle", icon: "👨‍🍳" },
    { id: 8, user_id: 4, name: "Traveling", category: "Lifestyle", icon: "🌍" },
  ]);

  const [currentUser] = useState(users[0]);

  const findPotentialMatches = () => {
    return users
      .filter((user) => user.id !== currentUser.id)
      .map((user) => ({
        user,
        compatibilityPercentage: 80,
      }));
  };

  return (
    <div className="matchmaking-page">
      <div className="profile-section">
        <img src={currentUser.avatar} alt="User Avatar" className="avatar" />
        <div className="user-info">
          <h2>{currentUser.name}</h2>
          <p>{currentUser.location}</p>
          <div className="habits">
            {habits
              .filter((habit) => habit.user_id === currentUser.id)
              .map((habit) => (
                <span key={habit.id} className="habit-tag">
                  {habit.name}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="accountability-partner">
        <h3>Accountability Partners</h3>
        {/* Map through current user's accountability partners */}
        {/* Placeholder for actual partner data */}
        <div className="partner-card">
          <img
            src="https://api.dicebear.com/7.x/personas/svg?seed=Partner"
            alt="Partner Avatar"
            className="partner-avatar"
          />
          <div className="partner-info">
            <h4>Chris Evans</h4>
            <p>Fitness Partner</p>
            <p className="progress">Progress: 85%</p>
          </div>
          <button className="progress-btn">View Progress</button>
        </div>
      </div>

      <div className="matches-section">
        <h3>Potential Matches</h3>
        {findPotentialMatches().map((match) => (
          <div className="match-card" key={match.user.id}>
            <div className="user-info">
              <img
                src={match.user.avatar}
                alt="User Avatar"
                className="avatar"
              />
              <div className="info">
                <h3>{match.user.name}</h3>
                <p>{match.user.location}</p>
              </div>
            </div>
            <div className="compatibility">
              <span className="icon">💯</span>
              <span className="percentage">
                {match.compatibilityPercentage}%
              </span>
            </div>
            <div className="actions">
              <button className="match-button">Match</button>
              <button className="chat-button">Chat</button>
            </div>
          </div>
        ))}
      </div>

      <button className="find-matches-btn">Find Matches</button>
    </div>
  );
};

export default MatchmakingPage;
