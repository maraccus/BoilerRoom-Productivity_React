// src/components/ModeCard.jsx
import React from "react";
import styles from "./ModeCard.module.css";

interface ModeCardProps {
  title: string;
  Icon: React.FC;
  onClick: () => void;
}

const ModeCard: React.FC<ModeCardProps> = ({ title, Icon, onClick }) => {
  return (
    <button className={styles.modeCard} onClick={onClick}>
      <Icon className={styles.modeIcon} />
      <p className={styles.modeTitle}>{title}</p>
    </button>
  );
};

export default ModeCard;
