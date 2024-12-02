import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import "./MatchmakingPage.scss"; 

const MatchmakingPage = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      location: "New York",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=John",
      age: 28,
      timeZone: "EST",
      commitmentLevel: "Intense",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      location: "San Francisco",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Jane",
      age: 32,
      timeZone: "PST",
      commitmentLevel: "Moderate",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      location: "Chicago",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Mike",
      age: 25,
      timeZone: "CST",
      commitmentLevel: "Casual",
    },
  ]);

  const [currentUser] = useState(users[0]);

  const [activePartners] = useState([
    {
      id: 1,
      name: "Emily Green",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Emily",
      sharedHabits: ["Morning Meditation", "Reading"],
      lastActiveTime: "5 mins ago",
      progress: 85,
    },
    {
      id: 2,
      name: "Alex Rivers",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Alex",
      sharedHabits: ["Exercise", "Nutrition"],
      lastActiveTime: "30 mins ago",
      progress: 75,
    },
  ]);

  const [potentialMatches] = useState([
    {
      id: 1,
      name: "Forest Walker",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Forest",
      sharedHabits: ["Meditation", "Reading"],
      matchScore: 85,
      age: 28,
      commitmentLevel: "Intense",
    },
    {
      id: 2,
      name: "Mountain Climber",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Mountain",
      sharedHabits: ["Exercise", "Nutrition"],
      matchScore: 75,
      age: 35,
      commitmentLevel: "Moderate",
    },
  ]);

  const [selectedPartner, setSelectedPartner] = useState(null);
  const [notification, setNotification] = useState("");

  const [filters, setFilters] = useState({
    ageRange: [20, 40], // Default range for age
    sharedHabits: [], 
    commitmentLevel: "", 
  });

  const [showFilters, setShowFilters] = useState(false); 

  const handleConnect = () => {
    setNotification("Connection request sent");
    setTimeout(() => setNotification(""), 3000); // Hide notification after 3 seconds
  };

  const handleChat = (partner) => {
    setSelectedPartner(partner);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => {
      if (type === "checkbox") {
        return {
          ...prevFilters,
          [name]: checked
            ? [...prevFilters[name], value]
            : prevFilters[name].filter((item) => item !== value),
        };
      } else if (type === "range") {
        return {
          ...prevFilters,
          [name]: value,
        };
      } else {
        return {
          ...prevFilters,
          [name]: value,
        };
      }
    });
  };

  // Filter potential matches based on selected filters
  const filteredMatches = potentialMatches.filter((match) => {
    const matchesAge =
      match.age >= filters.ageRange[0] && match.age <= filters.ageRange[1];
    const matchesHabits = filters.sharedHabits.every((habit) =>
      match.sharedHabits.includes(habit)
    );
    const matchesCommitmentLevel = filters.commitmentLevel
      ? match.commitmentLevel === filters.commitmentLevel
      : true;

    return matchesAge && matchesHabits && matchesCommitmentLevel;
  });

  const renderActivePartners = () => (
    <div className="partners-container">
      <h3>Active Accountability Partners</h3>
      <div className="active-partners">
        {activePartners.map((partner) => (
          <div
            className="active-partner-card"
            key={partner.id}
            onClick={() => setSelectedPartner(partner)}
          >
            <div className="avatar">
              <MessageCircle />
            </div>
            <div className="partner-info">
              <h4>{partner.name}</h4>
              <p>Shared Habits: {partner.sharedHabits.join(", ")}</p>
              <p className="last-active">
                Last active: {partner.lastActiveTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFindPartnerSection = () => (
    <div className="find-partner">
      <h3 className="find-partner__header">Find Your Match</h3>
      <p className="find-partner__descriptions">
        Discover a partner to support your journey and reach your goals
        together!
      </p>
      <button onClick={() => setShowFilters((prev) => !prev)}>
        {showFilters ? "Hide Filters" : "Filter Preferences"}
      </button>

      {showFilters && (
        <div className="filters">
          <div className="filter-group">
            <label>Age Range</label>
            <input
              type="range"
              name="ageRange"
              value={filters.ageRange[0]}
              onChange={handleFilterChange}
            />
            <input
              type="range"
              name="ageRange"
              min="20"
              max="50"
              value={filters.ageRange[1]}
              onChange={handleFilterChange}
            />
            <span>
              {filters.ageRange[0]} - {filters.ageRange[1]}
            </span>
          </div>

          <div className="filter-group">
            <label>Commitment Level</label>
            <select
              name="commitmentLevel"
              value={filters.commitmentLevel}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Intense">Intense</option>
              <option value="Moderate">Moderate</option>
              <option value="Casual">Casual</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Shared Habits</label>
            <div>
              <input
                type="checkbox"
                name="sharedHabits"
                value="Meditation"
                onChange={handleFilterChange}
              />
              Meditation
              <input
                type="checkbox"
                name="sharedHabits"
                value="Exercise"
                onChange={handleFilterChange}
              />
              Exercise
              <input
                type="checkbox"
                name="sharedHabits"
                value="Reading"
                onChange={handleFilterChange}
              />
              Reading
              <input
                type="checkbox"
                name="sharedHabits"
                value="Nutrition"
                onChange={handleFilterChange}
              />
              Nutrition
            </div>
          </div>
        </div>
      )}

      <div className="potential-matches">
        {filteredMatches.map((match) => (
          <div className="match-card" key={match.id}>
            <div className="partner-avatar">
              <img src={match.avatar} alt={match.name} />
            </div>
            <div className="info">
              <h4>{match.name}</h4>
              <p>Shared Habits: {match.sharedHabits.join(", ")}</p>
              <div className="match-score">
                Match Score: {match.matchScore}%
              </div>
            </div>
            <button className="connect-button" onClick={handleConnect}>
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="chat-container">
      <div className="chat-header">
        <button
          className="back-button"
          onClick={() => setSelectedPartner(null)}
        >
          Back
        </button>
        <h1>Chat with {selectedPartner.name}</h1>
      </div>
    </div>
  );

  return (
    <div className="matchmaking-page">
      {notification && <div className="notification">{notification}</div>}
      {selectedPartner ? renderChat() : renderFindPartnerSection()}
      {renderActivePartners()}
    </div>
  );
};

export default MatchmakingPage;
