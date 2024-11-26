import React, { useState } from "react";
import "./Journal.scss"; //
const Journal = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [mood, setMood] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Journal Entry:", journalEntry);
    console.log("Mood:", mood);
    setJournalEntry("");
    setMood("");
  };

  return (
    <div className="journal-page">
      <h1>Your Journal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mood: </label>
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="How are you feeling today?"
          />
        </div>
        <div>
          <label>Journal Entry: </label>
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write your thoughts..."
            rows="6"
          />
        </div>
        <button type="submit">Save Journal</button>
      </form>
    </div>
  );
};

export default Journal;
