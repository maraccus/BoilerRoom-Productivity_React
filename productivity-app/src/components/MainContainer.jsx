import React from 'react';
import styles from "./MainContainer.module.css";

let isActive = false;

const MainContainer = ({ children }) => {
  return (
    <div className={`${styles.mainContainer} ${isActive ? styles.timerRunning : ""}`}>
      {children}
    </div>
  )
}

export default MainContainer