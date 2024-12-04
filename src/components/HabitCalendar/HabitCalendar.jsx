import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from "date-fns";
import "./HabitCalendar.scss";
const HabitCalendar = ({ habits, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const renderCalendarDay = (day) => {
    const dayHabits = habits.filter((habit) => {
      const habitStartDate = parseISO(habit.start_date);
      return isSameDay(habitStartDate, day);
    });

    const isCurrentMonth = isSameMonth(day, currentMonth);
    const todayHighlight = isToday(day) ? "today" : "";

    const dayClasses = [
      "calendar-day",
      !isCurrentMonth ? "other-month" : "",
      dayHabits.length > 0 ? "has-habits" : "",
      todayHighlight,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        key={day.toISOString()}
        className={dayClasses}
        onClick={() => onDateSelect && onDateSelect(day)}
      >
        <div className="calendar-day-number">{format(day, "d")}</div>
        {dayHabits.map((habit) => (
          <div
            key={habit.id}
            className="habit-dot"
            style={{
              backgroundColor: habit.completed ? "#4caf50" : "#2196f3",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="nature-habit-calendar compact">
      <div className="calendar-header">
        <h3>{format(currentMonth, "MMMM yyyy")}</h3>
        <div className="calendar-navigation">
          <button
            onClick={() =>
              setCurrentMonth(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
              )
            }
          >
            ←
          </button>
          <button
            onClick={() =>
              setCurrentMonth(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
              )
            }
          >
            →
          </button>
        </div>
      </div>
      <div className="calendar-weekdays">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">{days.map(renderCalendarDay)}</div>
    </div>
  );
};

export default HabitCalendar;
