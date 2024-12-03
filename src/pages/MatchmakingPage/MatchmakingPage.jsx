import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import "./MatchmakingPage.scss";
import Chat from "../../components/Chat/Chat.jsx";

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
    commitmentLevel: "",
    ageRange: [13, 100], // Default age range (13+ to 100+)
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleConnect = () => {
    setNotification("Connection request sent");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleChat = (partner) => {
    setSelectedPartner(partner);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "ageRange") {
      const newAgeRange = [...filters.ageRange];
      newAgeRange[e.target.dataset.index] = value;
      setFilters((prevFilters) => ({
        ...prevFilters,
        ageRange: newAgeRange,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const filteredMatches = potentialMatches.filter((match) => {
    const matchesAge =
      match.age >= filters.ageRange[0] && match.age <= filters.ageRange[1];
    const matchesCommitmentLevel = filters.commitmentLevel
      ? match.commitmentLevel === filters.commitmentLevel
      : true;

    return matchesAge && matchesCommitmentLevel;
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
              id="age-range-min"
              type="range"
              name="ageRange"
              min="13"
              max="100"
              value={filters.ageRange[0]}
              onChange={handleFilterChange}
              step="1"
              data-index="0"
            />
            <span>{filters.ageRange[0]}+</span>{" "}
            {/* Display minimum age range */}
            <input
              id="age-range-max"
              type="range"
              name="ageRange"
              min="13"
              max="100"
              value={filters.ageRange[1]}
              onChange={handleFilterChange}
              step="1"
              data-index="1"
            />
            <span>{filters.ageRange[1]}+</span>{" "}
            {/* Display maximum age range */}
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
      </div>
      <Chat partner={selectedPartner} />
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
