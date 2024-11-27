import React, { useState } from "react";
import "./Partner.scss"; // SCSS for styling

const Partner = () => {
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      habits: ["Meditation", "Exercise", "Reading"],
      avatar: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Taylor Smith",
      habits: ["Journaling", "Yoga", "Healthy Eating"],
      avatar: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Jordan Lee",
      habits: ["Running", "Gratitude", "Minimalism"],
      avatar: "https://via.placeholder.com/100",
    },
  ]);

  const handleSendRequest = (partnerId) => {
    // Handle sending request (replace with API integration later)
    console.log(`Request sent to partner with ID: ${partnerId}`);
    alert(`Request sent to partner!`);
  };

  return (
    <div className="partner">
      <h1 className="partner__title">Find Your Accountability Partner</h1>
      <p className="partner__description">
        Connect with people who share your habits and goals. Start challenges
        together and grow as a team!
      </p>

      <div className="partner__list">
        {partners.map((partner) => (
          <div className="partner__card" key={partner.id}>
            <img
              src={partner.avatar}
              alt={`${partner.name}'s avatar`}
              className="partner__avatar"
            />
            <h3 className="partner__name">{partner.name}</h3>
            <p className="partner__habits">
              Habits: {partner.habits.join(", ")}
            </p>
            <button
              className="partner__button"
              onClick={() => handleSendRequest(partner.id)}
            >
              Send Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partner;
