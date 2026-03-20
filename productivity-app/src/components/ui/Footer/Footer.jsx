import React from 'react'
import styles from "./Footer.module.css";
import ConfettiButton from '../Button/ConfettiButton';

const Footer = () => {

  return (
    <footer className={styles.footer}>
        <p className={styles.footerText}>Work Timer by  <ConfettiButton/> , Chas Academy 2026</p>
    </footer>
  )
}

export default Footer