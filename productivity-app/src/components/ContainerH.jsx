import React from 'react';
import styles from "./ContainerH.module.css";


const ContainerH = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      {children}
    </div>
  )
}

export default ContainerH