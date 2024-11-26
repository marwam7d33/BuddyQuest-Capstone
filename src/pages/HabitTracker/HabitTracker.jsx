import React, { useState } from "react";
import "./HabitTracker.scss";

const HabitTracker = () => {
  const [habits, setHabits] = useState([
    { id: 1, text: "Drink Water", completed: false },
    { id: 2, text: "Exercise", completed: false },
    { id: 3, text: "Read a Book", completed: false },
  ]);

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <div className="habit-tracker">
      <h2>Habit Tracker</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id} className={habit.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
              />
              {habit.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;
