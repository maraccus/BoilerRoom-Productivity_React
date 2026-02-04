import GearIcon from "../assets/gear-solid-full.svg?react";
import styles from "./Navigation.module.css";
import popupStyles from "./ButtonSettings.module.css";
import React from 'react'
import { useState } from "react";
import ButtonStd from "./ButtonStd";
import MoonIcon from "../assets/moon-solid-full.svg?react";
import SunIcon from "../assets/sun-solid-full.svg?react";
import ContainerH from "./ContainerH";

const ButtonSettings = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); 

  return (
    <>
      <button className={styles.iconBtn} aria-label="Settings">
        <GearIcon className={styles.icon} onClick={() => setOpen(true)}/>
      </button>

      <div className={`${popupStyles.overlay} ${open ? popupStyles.open : "" }`} onClick={() => setOpen(false)}>
        <div
          className={popupStyles.modal} onClick={e => e.stopPropagation()}>
          <h2>Settings</h2>

          <div className={popupStyles.settingsBorder}>
            <ContainerH>
                <ButtonStd onClick={() => {
                  setDarkMode(d => !d);
                  document.body.classList.toggle("theme-dark");
                  document.body.classList.toggle("theme-light");
                  }}>
                    <span className={popupStyles.iconWrapper}>
                        <MoonIcon
                        className={`${popupStyles.icon} ${
                            darkMode ? popupStyles.visible : popupStyles.hidden
                        }`}
                        />
                        <SunIcon
                        className={`${popupStyles.icon} ${
                            darkMode ? popupStyles.hidden : popupStyles.visible
                        }`}
                        />
                    </span>
                </ButtonStd>
            </ContainerH>

            
          </div>

          <ButtonStd onClick={() => setOpen(false)}>Close</ButtonStd>
        </div>
      </div>
    </>
  );
};


export default ButtonSettings