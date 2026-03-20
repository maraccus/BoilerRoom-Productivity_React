import React from "react";
import { Link, NavLink } from "react-router";
import styles from "./Navigation.module.css";
import NavigationSpacer from "./NavigationSpacer";

import ButtonSettings from "../Button/ButtonSettings";

import HomeIcon from "@/assets/icons/house-regular-full.svg?react";
import CalendarIcon from "@/assets/icons/calendar-regular-full.svg?react";
import ChartIcon from "@/assets/icons/chart-simple-solid-full.svg?react";
import ClockIcon from "@/assets/icons/clock-regular-full.svg?react";
import { useTimer } from "../../../contexts/TimerContext";

import TimerRunningIcon from "@/assets/icons/hourglass-half-solid-full.svg?react"

const Navigation = () => {
  const { state } = useTimer();
  const activeMode = state.isActive ? state.mode : null;
  const timerHref = activeMode ? `/timer/${activeMode}` : "/timer";

  return (
    <>
      <nav className={styles.navBar}>

      {activeMode && (
        <NavLink to={timerHref} className={styles.firstInNav}>
          <button className={styles.runningBtn} aria-label="Timer">
            <TimerRunningIcon className={styles.iconRunning}/>
            <p>Timer is running...</p>
          </button>
        </NavLink>
      )}
      
      <NavLink to="/">
        <button className={styles.iconBtn} aria-label="Dashboard">
          <HomeIcon className={styles.icon} />
        </button>    
      </NavLink>
      {activeMode && (
        <NavLink to={timerHref}>
          <button className={styles.iconBtn} aria-label="Timer">
            <ClockIcon className={styles.icon} />
          </button>
        </NavLink>
      )}
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
    </>
    
  );
};

export default Navigation;
