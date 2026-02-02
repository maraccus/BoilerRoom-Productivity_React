// src/components/ModeCard.jsx
import React from "react";
import styles from "./ModeCard.module.css";

export default function ModeCard({ title, Icon, onClick }) {
  return (
    <button className={styles.modeCard} onClick={onClick}>
      <Icon className={styles.modeIcon} />
      <p className={styles.modeTitle}>{title}</p>
    </button>
  );
}
