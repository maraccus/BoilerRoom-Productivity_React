import GearIcon from "@/assets/icons/gear-solid-full.svg?react";
import styles from "@/components/ui/Navigation/Navigation.module.css";
import popupStyles from "@/components/ui/Button/ButtonSettings.module.css"
import { useState } from "react";
import ButtonStd from "./ButtonStd";
import MoonIcon from "@/assets/icons/moon-solid-full.svg?react";
import SunIcon from "@/assets/icons/sun-solid-full.svg?react";
import ContainerH from "../Container/ContainerH";
import { useWorkDaySettings } from "@/contexts/WorkDaySettingsContext";

const hours = Array.from({ length: 24 }, (_, i) => i);

const ButtonSettings = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { settings, update } = useWorkDaySettings();

  const fromOptions = hours.filter((h) => h < settings.endHour);
  const toOptions = hours.filter((h) => h > settings.startHour);

  return (
    <>
      <button className={styles.iconBtn} aria-label="Settings">
        <GearIcon className={styles.icon} onClick={() => setOpen(true)} />
      </button>

      <div
        className={`${popupStyles.overlay} ${open ? popupStyles.open : ""}`}
        onClick={() => setOpen(false)}
      >
        <div className={popupStyles.modal} onClick={(e) => e.stopPropagation()}>
          <h2>Settings</h2>

          {/* Theme toggle */}
          <div className={popupStyles.settingsBorder}>
            <ContainerH>
              <ButtonStd
                onClick={() => {
                  setDarkMode((d) => !d);
                  document.body.classList.toggle("theme-dark");
                  document.body.classList.toggle("theme-light");
                }}
              >
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

          {/* Work day window */}
          <h3 className={popupStyles.settingLabel}>Calendar work window</h3>
          <div className={popupStyles.settingsBorder}>
            <ContainerH>
              <label className={popupStyles.selectLabel}>
                From:
                <select
                  value={settings.startHour}
                  onChange={(e) =>
                    update({ startHour: Number(e.target.value) })
                  }
                  className={popupStyles.select}
                >
                  {fromOptions.map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
              </label>

              <label className={popupStyles.selectLabel}>
                To:
                <select
                  value={settings.endHour}
                  onChange={(e) => update({ endHour: Number(e.target.value) })}
                  className={popupStyles.select}
                >
                  {toOptions.map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
              </label>
            </ContainerH>
          </div>

          <ButtonStd onClick={() => setOpen(false)}>Close</ButtonStd>
        </div>
      </div>
    </>
  );
};

export default ButtonSettings;
