import React from 'react';
import styles from "./ContainerH.module.css";


const ContainerH = ({ children }) => {
  return (
    <div className={styles.containerH}>
      {children}
    </div>
  )
}

export default ContainerH