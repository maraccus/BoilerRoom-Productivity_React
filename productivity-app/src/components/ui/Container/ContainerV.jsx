import React from 'react';
import styles from "./ContainerV.module.css";


const ContainerV = ({ children }) => {
  return (
    <div className={styles.containerV}>
      {children}
    </div>
  )
}

export default ContainerV