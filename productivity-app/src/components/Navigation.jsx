import React from "react";
import styles from "./Navigation.module.css";

import GearIcon from "../assets/gear-solid-full.svg?react";

const Navigation = () => {
  return (
    <nav className={styles.navBar}>
      <button className={styles.iconBtn} aria-label="Settings">
        <GearIcon className={styles.icon} />
      </button>
    </nav>
  );
};

export default Navigation;
