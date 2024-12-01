import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Journal.scss";
import { format } from "date-fns";
import { FaBook, FaPen } from "react-icons/fa"; // Import FaBook for the diary icon
import { FaSmile, FaSadTear, FaAngry } from "react-icons/fa"; // Add mood icons if needed

const BASE_URL = import.meta.env.VITE_API_URL;

const Journal = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [mood, setMood] = useState("");
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [journals, setJournals] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);

  // List of moods (we'll use emojis directly here)
  const moods = ["😊", "😔", "😡", "😌", "😅"];

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/journals`);
        if (Array.isArray(response.data)) {
          setJournals(response.data);
        } else {
          console.error(
            "Expected an array of journals, but received:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };

    fetchJournals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mood || !journalEntry || !title) {
      alert("Title, mood, and journal entry are required!");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        title,
        mood,
        entry: journalEntry,
        entry_date: entryDate,
      };

      let response;
      if (editingJournal) {
        response = await axios.put(
          `${BASE_URL}/journals/${editingJournal.id}`,
          data
        );
        setJournals((prevJournals) =>
          prevJournals.map((journal) =>
            journal.id === editingJournal.id ? response.data : journal
          )
        );
        setEditingJournal(null);
      } else {
        response = await axios.post(`${BASE_URL}/journals`, data);
        // Directly add the new journal entry to the state without needing a re-fetch
        setJournals((prevJournals) => [...prevJournals, response.data]);
      }

      setJournalEntry("");
      setMood("");
      setTitle("");
      setEntryDate(new Date().toISOString().split("T")[0]);
      setFormVisible(false);

      alert("Journal entry saved successfully!");
    } catch (err) {
      console.error("Error saving journal entry:", err);
      alert("Failed to save journal entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setTitle(journal.title);
    setMood(journal.mood);
    setJournalEntry(journal.entry);
    setEntryDate(journal.entry_date);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/journals/${id}`);
      // Immediately remove the deleted journal from state without needing a re-fetch
      setJournals((prevJournals) =>
        prevJournals.filter((journal) => journal.id !== id)
      );
      alert("Journal entry deleted successfully!");
    } catch (err) {
      console.error("Error deleting journal entry:", err);
      alert("Failed to delete journal entry.");
    }
  };

  return (
    <section className="journal">
      <div className="journal__page">
        {/* Header with form toggle and diary icon */}
        <div className="journal__header">
          <button
            className="journal__header__plus"
            onClick={() => setFormVisible(!formVisible)}
          >
            <FaPen color="green" size="1.5rem" />{" "}
            {/* Pencil icon for editing */}
            {/* <FaBook color="green" size="1.5em" /> Diary icon */}
          </button>
          <div className="journal__header__mood">
            <span className="journal__header__mood__label">
              How are you feeling?
            </span>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="journal__header__mood__select"
            >
              <option value="">Select your mood</option>
              {moods.map((emoji, index) => (
                <option key={index} value={emoji}>
                  {emoji}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Form Section */}
        {formVisible && (
          <div className="journal__form">
            <input
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              className="journal__form__date"
            />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="journal__form__title"
            />
            <textarea
              placeholder="Tell me about your day..."
              rows="8"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="journal__form__textarea"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="journal__form__button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        )}

        {/* Display Journals */}
        <div className="journal__list">
          {journals.length === 0 ? (
            <p className="journal__list__empty">No journals found.</p>
          ) : (
            journals.map((journal) => (
              <div key={journal.id} className="journal__item">
                <div className="journal__item__header">
                  <h3 className="journal__item__title">{journal.title}</h3>
                  <div className="journal__item__actions">
                    <button
                      onClick={() => handleEdit(journal)}
                      className="journal__item__edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(journal.id)}
                      className="journal__item__delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="journal__item__mood">
                  {/* Animated Emoji */}
                  <span className="mood-icon">{journal.mood}</span>
                </div>
                <p className="journal__item__entry">{journal.entry}</p>
                <small className="journal__item__date">
                  {format(new Date(journal.entry_date), "MMMM dd, yyyy")}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Journal;
