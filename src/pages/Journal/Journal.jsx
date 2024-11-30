import React, { useState } from "react";
import axios from "axios";
import "./Journal.scss";

const moods = [
  "😊 Happy",
  "😔 Sad",
  "😡 Angry",
  "😌 Calm",
  "😅 Anxious",
  "😔 Depressed",
];

const Journal = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [mood, setMood] = useState("");
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today's date
  const [title, setTitle] = useState(""); // New state for title
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!mood || !journalEntry || !title) {
      alert("Title, mood, and journal entry are required!");
      return;
    }

    setIsSubmitting(true); // Show loading state

    try {
      const response = await axios.post("/api/journals", {
        title,
        mood,
        entry: journalEntry,
        entry_date: entryDate,
      });

      console.log("Journal entry created:", response.data);
      setJournalEntry(""); // Clear form fields
      setMood(""); // Clear mood selection
      setTitle(""); // Clear title
      setEntryDate(new Date().toISOString().split("T")[0]); // Reset date to today
      alert("Journal entry saved successfully!");
    } catch (err) {
      console.error("Error creating journal entry:", err);
      alert("Failed to save journal entry.");
    } finally {
      setIsSubmitting(false); // Hide loading state
    }
  };

  return (
    <section className="Journal__wrapper">
      <div className="journal-page">
        <div className="journal-header">
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
          />
          <div className="mood-selector">
            <label htmlFor="mood">Select Mood:</label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
            >
              <option value="">Select your mood</option>
              {moods.map((mood, index) => (
                <option key={index} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="title-container">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="journal-title"
          />
        </div>

        <textarea
          placeholder="Tell me about your day..."
          rows="8"
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </button>

     </section>
  );
};

export default Journal;
