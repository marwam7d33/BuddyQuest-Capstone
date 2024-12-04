import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./StreaksPage.scss";

const StreaksPage = () => {
  const { state } = useLocation(); // Receive habits from navigation
  const [streaks, setStreaks] = useState([]);

  // Function to calculate streaks based on habit completion dates
  const calculateStreaks = (habits) => {
    const streaksData = habits.map((habit) => {
      const completionDates = habit.completedDates || []; // Assume you track completed dates
      let streak = 0;
      let longestStreak = 0;

      completionDates.forEach((date, index) => {
        if (
          index === 0 ||
          new Date(date).getTime() -
            new Date(completionDates[index - 1]).getTime() ===
            86400000
        ) {
          streak += 1;
        } else {
          longestStreak = Math.max(longestStreak, streak);
          streak = 1; // Reset streak when a gap is found
        }
      });

      longestStreak = Math.max(longestStreak, streak);
      return {
        habitName: habit.name,
        streak: longestStreak,
      };
    });

    setStreaks(streaksData);
  };

  useEffect(() => {
    if (state && state.habits) {
      calculateStreaks(state.habits);
    }
  }, [state]);

  return (
    <div className="streaks-page">
      <h2>Your Habit Streaks</h2>
      {streaks.length === 0 ? (
        <p>No streaks available. Start completing your habits!</p>
      ) : (
        <div className="streaks-list">
          {streaks.map((streak, index) => (
            <div key={index} className="streak-item">
              <span className="habit-name">{streak.habitName}</span>
              <span className="habit-streak">
                {streak.streak} {streak.streak > 1 ? "days" : "day"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StreaksPage;
