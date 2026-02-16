import React from "react";
import { Link, NavLink } from "react-router";
import styles from "./Navigation.module.css";
import NavigationSpacer from "./NavigationSpacer";

import ButtonSettings from "./ButtonSettings";

import HomeIcon from "../assets/house-regular-full.svg?react"
import CalendarIcon from "../assets/calendar-regular-full.svg?react";
import ChartIcon from "../assets/chart-simple-solid-full.svg?react";
import ClockIcon from "../assets/clock-regular-full.svg?react";

const Navigation = () => {
  return (
    <nav className={styles.navBar}>
      <NavLink to="/">
        <button className={styles.iconBtn} aria-label="Dashboard">
          <HomeIcon className={styles.icon} />
        </button>    
      </NavLink>
      <NavLink to="/timer">
        <button className={styles.iconBtn} aria-label="Timer">
          <ClockIcon className={styles.icon} />
        </button>
      </NavLink>
      <NavLink to="/calendar">
        <button className={styles.iconBtn} aria-label="Settings">
          <CalendarIcon className={styles.icon} />
        </button>
      </NavLink>
      <NavLink to="/graphs">
        <button className={styles.iconBtn} aria-label="Graphs">
          <ChartIcon className={styles.icon} />
        </button>
      </NavLink>
      <NavigationSpacer />
      <ButtonSettings />
    </nav>
  );
};

export default Navigation;
