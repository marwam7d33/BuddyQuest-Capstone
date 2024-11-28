import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker"; // For calendar date picker
import "react-datepicker/dist/react-datepicker.css"; // Import calendar styles
import "./HabitTracker.scss";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [habitName, setHabitName] = useState("");
  const [habitFrequency, setHabitFrequency] = useState("Daily");
  const [startDate, setStartDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/habits`);
        setHabits(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching habits:", error);
        setLoading(false);
      }
    };
    fetchHabits();
  }, []);

  const addHabit = async (e) => {
    e.preventDefault();
    if (!habitName.trim()) {
      alert("Please enter a valid habit name.");
      return;
    }

    const newHabit = {
      user_id: 1, // Example user ID
      name: habitName,
      frequency: habitFrequency,
      progress: 0,
      start_date: startDate.toISOString().split("T")[0],
      end_date: "2024-12-31",
    };

    try {
      const response = await axios.post(`${BASE_URL}/habits`, newHabit);
      setHabits([...habits, response.data]);
      setHabitName("");
      setHabitFrequency("Daily");
      setModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  const markComplete = async (habitId) => {
    const updatedHabit = habits.map((habit) => {
      if (habit.id === habitId) {
        return { ...habit, progress: 100, completed: !habit.completed };
      }
      return habit;
    });
    setHabits(updatedHabit);

    // Update the habit progress in the database
    try {
      await axios.put(`${BASE_URL}/habits/${habitId}`, {
        progress: 100,
        completed: true,
      });
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <p>Loading habits...</p>;
  }

  return (
    <div className="habit-tracker">
      <div className="habit-tracker__header">Habit Tracker</div>

      <button
        className="habit-tracker__add-button"
        onClick={() => setModalOpen(true)}
      >
        + Add Habit
      </button>

      <div className="habit-tracker__habit-list">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={`habit-tracker__habit-item ${
              habit.completed ? "completed" : ""
            }`}
          >
            <div className="habit-tracker__item-header">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => markComplete(habit.id)}
                className="habit-tracker__checkbox"
              />
              <span className="habit-tracker__habit-name">{habit.name}</span>
            </div>

            <div className="habit-tracker__habit-progress">
              <div
                className="habit-tracker__progress-bar"
                style={{ width: `${habit.progress}%` }}
              />
            </div>

            <div className="habit-tracker__habit-item--details">
              Start Date: {formatDate(habit.start_date)}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="habit-tracker__modal">
          <div className="habit-tracker__form-container">
            <form className="habit-tracker__form" onSubmit={addHabit}>
              <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="Enter Habit Name"
                required
              />
              <select
                value={habitFrequency}
                onChange={(e) => setHabitFrequency(e.target.value)}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="habit-tracker__calendar"
              />
              <button className="habit-tracker__button" type="submit">
                Save
              </button>
              <button
                className="habit-tracker__button habit-tracker__button--close"
                type="button"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitTracker;
