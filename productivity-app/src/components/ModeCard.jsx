// src/components/ModeCard.jsx
import React from "react";
import "./ModeCard.css"; // Din CSS-fil för styling

export default function ModeCard({ title, Icon, onClick }) {
  return (
    <div className="mode-card" onClick={onClick}>
      <Icon className="mode-icon" /> {/* ← nu renderas SVG:en som komponent */}
      <p className="mode-title">{title}</p>
    </div>
  );
}
