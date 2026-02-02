import GearIcon from "../assets/gear-solid-full.svg?react";
import styles from "./Navigation.module.css";
import popupStyles from "./ButtonSettings.module.css";
import React from 'react'
import { useState } from "react";
import ButtonStd from "./ButtonStd";

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
        
                    {/* <label>
                        <input type="checkbox" />
                        Dark mode
                    </label> */}

                    <ButtonStd onClick={() => setOpen(false)}>Close</ButtonStd>
                    {/* <button onClick={() => setOpen(false)}>Close</button> */}
                  </div>
                </div>
            )}
        </>
    )
}

export default ButtonSettings