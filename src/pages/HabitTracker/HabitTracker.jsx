import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import HabitCalendar from "../../components/HabitCalendar/HabitCalendar";
import "./HabitTracker.scss";

const HabitTracker = ({ onAddNotification }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [habitName, setHabitName] = useState("");
  const [habitFrequency, setHabitFrequency] = useState("Daily");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

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
  }, [BASE_URL]);

  const handleDateSelect = (selectedDate) => {
    setSelectedDate(selectedDate);
    setStartDate(selectedDate);
    setModalOpen(true);
  };

  // Filter habits for selected date
  const filteredHabits = habits.filter((habit) => {
    const habitStartDate = new Date(habit.start_date);
    return (
      selectedDate >= habitStartDate &&
      (!habit.end_date || selectedDate <= new Date(habit.end_date))
    );
  });

  const addHabit = async (e) => {
    e.preventDefault();
    if (!habitName.trim()) {
      alert("Please enter a valid habit name.");
      return;
    }

    const newHabit = {
      user_id: 1,
      name: habitName,
      frequency: habitFrequency,
      progress: 0,
      start_date: startDate.toISOString().split("T")[0],
      end_date: "2024-12-31",
    };

    try {
      const response = await axios.post(`${BASE_URL}/habits`, newHabit);
      setHabits([...habits, response.data]);

      // Create a new notification and pass it to parent
      const newNotification = {
        id: Date.now(),
        message: `Great! Let's find an accountability partner for your ${habitName} habit.`,
        link: "/matchmaking",
      };

      onAddNotification(newNotification);

      setHabitName("");
      setHabitFrequency("Daily");
      setModalOpen(false);
      // Remove direct navigation
      // navigate("/matchmaking");
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
      setHabits(updatedHabits);
      setHabitName("");
      setHabitFrequency("Daily");
      setModalOpen(false);
      setCurrentHabit(null);
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const markComplete = async (habitId) => {
    const updatedHabit = habits.map((habit) => {
      if (habit.id === habitId) {
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

  const openEditModal = (habit) => {
    setHabitName(habit.name);
    setHabitFrequency(habit.frequency);
    setStartDate(new Date(habit.start_date));
    setCurrentHabit(habit);
    setModalOpen(true);
  };

  const deleteHabit = async (habitId) => {
    try {
      await axios.delete(`${BASE_URL}/habits/${habitId}`);
      setHabits(habits.filter((habit) => habit.id !== habitId));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const navigateToStreak = () => {
    navigate("/streak", { state: { habits } });
  };

  if (loading) {
    return <p>Loading habits...</p>;
  }

  return (
    <div className="habit-tracker">
      <div className="habit-tracker__header">
        <HabitCalendar
          habits={habits}
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />
        <button
          className="habit-tracker__streak-button"
          onClick={navigateToStreak}
        >
          View Streaks
        </button>
      </div>

      <button
        className="habit-tracker__add-button"
        onClick={() => setModalOpen(true)}
      >
        + Add Habit
      </button>

      <div className="habit-tracker__habit-list">
        {filteredHabits.map((habit) => (
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
