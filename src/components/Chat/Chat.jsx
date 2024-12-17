import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Chat.scss";

const socket = io("http://localhost:8080");

const Chat = ({ partner }) => {
  const [messages, setMessages] = useState([
    {
      sender: "Emily Green",
      content: "How's your meditation streak going?",
      timestamp: new Date(Date.now() - 600000),
    },
    {
      sender: "You",
      content: "Just hit 14 days straight!.",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      sender: "Emily Green",
      content: "Awesome! Keep it up.",
      timestamp: new Date(Date.now() - 1200000),
    },
  ]);

  const [input, setInput] = useState("");
  const room = `room-${partner.id}`;

  useEffect(() => {
    socket.emit("joinRoom", room);

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const message = {
      room,
      content: input,
      sender: "You",
      timestamp: new Date(),
    };

    socket.emit("sendMessage", message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setInput("");
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours ago`;
    return `${Math.floor(minutes / 1440)} days ago`;
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="header-left">
          <div className="avatar">😊</div>
          <div className="user-info">
            <div className="username">{partner.name}</div>
            <div className="shared-habits">
              Shared Habits: {partner.sharedHabits.join(", ")}
            </div>
          </div>
        </div>
        <div className="time">4:50 PM</div>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "You" ? "message-sent" : "message-received"
            }`}
          >
            <div className="message-content">
              <p>{msg.content}</p>
              <small>
                {msg.sender} - {formatTimestamp(msg.timestamp)}
              </small>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default Chat;
