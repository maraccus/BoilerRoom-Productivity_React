import React from 'react'
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p className={styles.footerText}>Work Timer by  <span className={styles.team}>Team Kattarp</span> , Chas Academy 2026</p>
    </footer>
  )
}

export default Footer