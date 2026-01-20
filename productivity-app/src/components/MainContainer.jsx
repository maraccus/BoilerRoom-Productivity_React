import React from 'react';
import styles from "./MainContainer.module.css";


const MainContainer = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      {children}
    </div>
  )
}

export default MainContainer