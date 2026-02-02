import GearIcon from "../assets/gear-solid-full.svg?react";
import styles from "./Navigation.module.css";
import popupStyles from "./ButtonSettings.module.css";
import React from 'react'
import { useState } from "react";
import ButtonStd from "./ButtonStd";
import MoonIcon from "../assets/moon-solid-full.svg?react";

const ButtonSettings = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className={styles.iconBtn} aria-label="Settings">
                <GearIcon className={styles.icon} onClick={() => setOpen(true)}/>
            </button>
        
            {open && (
                <div className={popupStyles.overlay} onClick={() => setOpen(false)}>
                  <div
                    className={popupStyles.modal}
                    onClick={e => e.stopPropagation()}
                  >
                    <h2>Settings</h2>
        
                    <div className={popupStyles.settingsBorder}>
                        <ButtonStd>
                            <MoonIcon className={popupStyles.icon}/>
                        </ButtonStd>
                        
                    </div>

                    <ButtonStd onClick={() => setOpen(false)}>Close</ButtonStd>

                  </div>
                </div>
            )}
        </>
    )
}

export default ButtonSettings