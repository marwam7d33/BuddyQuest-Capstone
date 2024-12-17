import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Journal.scss";
import { format } from "date-fns";
import { FaBook, FaPen } from "react-icons/fa";

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

  const moods = [
    { name: "happy", emoji: "😄" },
    { name: "sad", emoji: "😢" },
    { name: "excited", emoji: "🤩" },
    { name: "angry", emoji: "😠" },
    { name: "surprised", emoji: "😲" },
    { name: "nervous", emoji: "😬" },
    { name: "calm", emoji: "😌" },
    { name: "bored", emoji: "😒" },
    { name: "tired", emoji: "😴" },
    { name: "confused", emoji: "😕" },
    { name: "embarrassed", emoji: "😳" },
    { name: "love", emoji: "😍" },
    { name: "playful", emoji: "😜" },
    { name: "proud", emoji: "😌" },
    { name: "silly", emoji: "🤪" },
    { name: "frustrated", emoji: "😤" },
    { name: "hopeful", emoji: "🤞" },
    { name: "disappointed", emoji: "😞" },
    { name: "scared", emoji: "😱" },
    { name: "thoughtful", emoji: "🤔" },
    { name: "determined", emoji: "💪" },
    { name: "relaxed", emoji: "🌿" },
    { name: "grateful", emoji: "🙏" },
    { name: "confident", emoji: "😎" },
    { name: "indifferent", emoji: "😐" },
    { name: "shy", emoji: "😊" },
    { name: "cheerful", emoji: "😁" },
    { name: "nostalgic", emoji: "🕰️" },
    { name: "mischievous", emoji: "😏" },
    { name: "annoyed", emoji: "🙄" },
    { name: "overwhelmed", emoji: "😵" },
    { name: "lonely", emoji: "😔" },
    { name: "optimistic", emoji: "🌈" },
    { name: "guilty", emoji: "😔" },
    { name: "curious", emoji: "🧐" },
    { name: "content", emoji: "😇" },
  ];

  const [userId, setUserId] = useState(null);

  // Mock user ID for demonstration (replace with real logic if needed)
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/journals`);
        setJournals(response.data);
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };

    fetchJournals();
  }, []);

  const resetForm = () => {
    setJournalEntry("");
    setMood("");
    setTitle("");
    setEntryDate(new Date().toISOString().split("T")[0]);
    setEditingJournal(null);
    setFormVisible(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!mood || !journalEntry || !title) {
      alert("Title, mood, and journal entry are required!");
      return;
    }

    setIsSubmitting(true);

    const newJournal = {
      entry_date: entryDate,
      entry: journalEntry,
      mood,
      title,
    };

    try {
      let response;
      if (editingJournal) {
        response = await axios.put(
          `${BASE_URL}/journals/${editingJournal.id}`,
          newJournal
        );
        setJournals((prev) =>
          prev.map((journal) =>
            journal.id === editingJournal.id ? response.data : journal
          )
        );
        setEditingJournal(null);
      } else {
        response = await axios.post(`${BASE_URL}/journals`, newJournal);
        setJournals((prev) => [...prev, response.data]);
      }

      setJournalEntry("");
      setMood("");
      setTitle("");
      setEntryDate(new Date().toISOString().split("T")[0]);
      setFormVisible(false);
      alert("Journal entry saved successfully!");
    } catch (error) {
      console.error("Error saving journal entry:", error);
      alert("Failed to save journal entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/journals/${id}`);
      setJournals((prev) => prev.filter((journal) => journal.id !== id));
      alert("Journal entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      alert("Failed to delete journal entry.");
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

  return (
    <section className="journal">
      <div className="journal__page">
        <div className="journal__header">
          <button
            className="journal__header__plus"
            onClick={() => setFormVisible(!formVisible)}
          >
            <FaPen color="green" size="1.5rem" />
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
              {moods.map((moodObj, index) => (
                <option key={index} value={moodObj.name}>
                  {moodObj.emoji} {moodObj.name}
                </option>
              ))}
            </select>
          </div>
        </div>

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
              placeholder="Write your thoughts..."
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
              {isSubmitting ? "Saving..." : editingJournal ? "Update" : "Save"}
            </button>
          </div>
        )}

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
                  <span className="mood-icon">
                    {moods.find((moodObj) => moodObj.name === journal.mood)
                      ?.emoji || "🤔"}{" "}
                    {journal.mood}
                  </span>
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
