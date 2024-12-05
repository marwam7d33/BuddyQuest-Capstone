// src/components/Alert.js
import React from "react";
import "./Alert.scss";

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert">
      <span className="alert__message">{message}</span>
      <button className="alert__close-button" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
