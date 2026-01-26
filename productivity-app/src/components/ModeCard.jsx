// src/components/ModeCard.jsx
import React from "react";
import "./ModeCard.css"; // Din CSS-fil för styling

export default function ModeCard({ title, icon, onClick }) {
  return (
    <div className="mode-card" onClick={onClick}>
      <img src={icon} alt={`${title} icon`} className="mode-icon"></img>
      <p className="mode-title">{title}</p>
    </div>
  );
}
