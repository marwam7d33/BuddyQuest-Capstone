// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./Home.scss";
// import HabitTracker from "../HabitTracker/HabitTracker";
// import PrimarySearchAppBar from "../../components/PrimarySearchAppBar/PrimarySearchAppBar.jsx";

// const Home = ({ setBottomNavValue }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mood, setMood] = useState("");

//   const handleEmojiClick = (selectedMood) => {
//     setMood(selectedMood);
//     setBottomNavValue(1); // Set to the index for "Journal" in the navigation
//     navigate("/journal");
//   };

//   const isHomepage = location.pathname === "/";

//   return (
//     <div className="home">
//       <PrimarySearchAppBar />
//       <h1 className="home__title">Achieve Your Wellness Goals Today </h1>
//       <p>Do something today for your mind, body, and well-being</p>
//       <HabitTracker />

//       {isHomepage && (
//         <div className="home__mood">
//           <h2 className="home__mood-title">How are you feeling today?</h2>
//           <div className="home__emoji-container">
//             {[
//               { mood: "happy", emoji: "😊", label: "Happy" },
//               { mood: "neutral", emoji: "😐", label: "Neutral" },
//               { mood: "sad", emoji: "😢", label: "Sad" },
//               { mood: "angry", emoji: "😡", label: "Angry" },
//               { mood: "excited", emoji: "🤩", label: "Excited" },
//             ].map(({ mood, emoji, label }) => (
//               <span
//                 key={mood}
//                 className={`home__emoji home__emoji--${mood}`}
//                 onClick={() => handleEmojiClick(mood)}
//                 role="img"
//                 aria-label={label}
//               >
//                 {emoji}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.scss";
import HabitTracker from "../HabitTracker/HabitTracker";
import PrimarySearchAppBar from "../../components/PrimarySearchAppBar/PrimarySearchAppBar";

const Home = ({ setBottomNavValue }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mood, setMood] = useState("");
  const [notifications, setNotifications] = useState([]);

  const handleEmojiClick = (selectedMood) => {
    setMood(selectedMood);
    setBottomNavValue(1);
    navigate("/journal");
  };

  const handleAddNotification = (newNotification) => {
    setNotifications((prev) => [...prev, newNotification]);
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  const isHomepage = location.pathname === "/";

  return (
    <div className="home">
      <PrimarySearchAppBar
        notifications={notifications}
        onDismissNotification={handleDismissNotification}
      />
      <h1 className="home__title">Achieve Your Wellness Goals Today </h1>
      <p>Do something today for your mind, body, and well-being</p>
      <HabitTracker onAddNotification={handleAddNotification} />

      {isHomepage && (
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
      )}
    </div>
  );
};

export default Home;
