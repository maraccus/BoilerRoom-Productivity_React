import React from "react";
import styles from "./Navigation.module.css";
import NavigationSpacer from "./NavigationSpacer";

import GearIcon from "../assets/gear-solid-full.svg?react";
import CalendarIcon from "../assets/calendar-regular-full.svg?react";
import ChartIcon from "../assets/chart-simple-solid-full.svg?react";
import ClockIcon from "../assets/clock-regular-full.svg?react";

const Navigation = () => {
  return (
    <nav className={styles.navBar}>
      <button className={styles.iconBtn} aria-label="Settings">
        <ClockIcon className={styles.icon} />
      </button>
      <button className={styles.iconBtn} aria-label="Settings">
        <CalendarIcon className={styles.icon} />
      </button>
      <button className={styles.iconBtn} aria-label="Settings">
        <ChartIcon className={styles.icon} />
      </button>

      <NavigationSpacer />

      <button className={styles.iconBtn} aria-label="Settings">
        <GearIcon className={styles.icon} />
      </button>
    </nav>
  );
};

export default Navigation;
