// src/components/ModeCard.jsx
import React from "react";
import styles from "./ModeCard.module.css";

// NOTERA: Icon-proppen fungerar! Gråmarkeringen är troligen en bugg eller ESLint-tjosan. Ignorera.
export default function ModeCard({ title, Icon, onClick }) {
  // console.log("Detta är Icon från ModeCard:", Icon);
  return (
    <button className={styles.modeCard} onClick={onClick}>
      <Icon className={styles.modeIcon} />
      <p className={styles.modeTitle}>{title}</p>
    </button>
  );
}
