import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Don't forget to import the date picker styles
import "./HabitTracker.scss";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [habitName, setHabitName] = useState("");
  const [habitFrequency, setHabitFrequency] = useState("Daily");
  const [startDate, setStartDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(null); // To store the habit being edited
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
      progress: 0, // Ensure progress is always 0 when adding
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

  const updateHabit = async (e) => {
    e.preventDefault();
    if (!habitName.trim()) {
      alert("Please enter a valid habit name.");
      return;
    }

    const updatedHabit = {
      id: currentHabit.id,
      name: habitName,
      frequency: habitFrequency,
      start_date: startDate.toISOString().split("T")[0],
      end_date: "2024-12-31",
      progress: currentHabit.progress,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/habits/${currentHabit.id}`,
        updatedHabit
      );
      const updatedHabits = habits.map((habit) =>
        habit.id === currentHabit.id ? { ...habit, ...updatedHabit } : habit
      );
      setHabits(updatedHabits); // Update the local state with the updated habit
      setHabitName("");
      setHabitFrequency("Daily");
      setModalOpen(false); // Close the modal after updating
      setCurrentHabit(null); // Clear the current habit state
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };
  //revisit this fnx
  const markComplete = async (habitId) => {
    const updatedHabit = habits.map((habit) => {
      if (habit.id === habitId) {
        //revisit
        // Toggle the 'completed' status and adjust progress accordingly
        const newProgress = habit.completed ? 0 : 100;
        const newCompleted = !habit.completed;

        return { ...habit, progress: newProgress, completed: newCompleted };
      }
      return habit;
    });

    setHabits(updatedHabit);

    try {
      await axios.put(`${BASE_URL}/habits/${habitId}`, {
        progress: updatedHabit.find((habit) => habit.id === habitId).progress,
        completed: updatedHabit.find((habit) => habit.id === habitId).completed,
      });
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  //edit modal form
  const openEditModal = (habit) => {
    setHabitName(habit.name);
    setHabitFrequency(habit.frequency);
    setStartDate(new Date(habit.start_date));
    setCurrentHabit(habit); // Store the habit being edited
    setModalOpen(true); // Open the modal
  };

  if (loading) {
    return <p>Loading habits...</p>;
  }

  // Delete a habit
  const deleteHabit = async (habitId) => {
    try {
      await axios.delete(`${BASE_URL}/habits/${habitId}`);

      // Update the local state to remove the deleted habit
      setHabits(habits.filter((habit) => habit.id !== habitId));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };
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
                //toggle
                //revisit
                onChange={() => markComplete(habit.id)}
                className="habit-tracker__checkbox"
              />
              <span className="habit-tracker__habit-name">{habit.name}</span>
              <button
                className="habit-tracker__edit-button"
                onClick={() => openEditModal(habit)}
              >
                Edit
              </button>
              <button
                className="habit-tracker__delete-button"
                onClick={() => deleteHabit(habit.id)}
              >
                Delete
              </button>
            </div>

            <div className="habit-tracker__habit-progress">
              <div
                className="habit-tracker__progress-bar"
                style={{
                  width: `${habit.progress}%`,
                  backgroundColor:
                    habit.progress === 0
                      ? "#d3d3d3"
                      : habit.progress === 100
                      ? "#4caf50"
                      : "#f0f0f0",
                }}
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
            <form
              className="habit-tracker__form"
              onSubmit={currentHabit ? updateHabit : addHabit}
            >
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
                {currentHabit ? "Update" : "Save"}
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
