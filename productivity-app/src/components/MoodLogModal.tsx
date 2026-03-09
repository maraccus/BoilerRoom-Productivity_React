import React from "react";
import ButtonStd from "./ButtonStd";
import ButtonStdRed from "./ButtonStdRed";
import { useMoodForm, MoodValue, CategoryValue } from "@/hooks/useMoodForm";
import styles from "./MoodCheck.module.css";

interface MoodLogModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (data: { mood: MoodValue; category: CategoryValue }) => void;
}

export default function MoodLogModal({ open, onCancel, onSubmit }: MoodLogModalProps) {
  const {
    state,
    setMood,
    setCategory,
    handleLog,
    isFormComplete,
    MOODS,
    CATEGORIES,
  } = useMoodForm(onSubmit);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        padding: "1rem",
      }}
      role="dialog"
      aria-modal="true"
    >
      <div style={{ position: "relative", width: "100%", maxWidth: "360px" }}>
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <ButtonStdRed onClick={onCancel}>
            <span style={{ fontSize: "0.85rem" }}>Avbryt</span>
          </ButtonStdRed>
        </div>

        <div className={styles.container}>
          <div className={styles.circle}>
            <div className={styles.content}>
              <h3 className={styles.heading}>Ange kategori:</h3>

              <select
                className={styles.categorySelect}
                value={state.selectedCategory || ""}
                onChange={(e) => setCategory(e.target.value as CategoryValue)}
                aria-label="Välj kategori"
              >
                <option value="" disabled>
                  Välj en kategori
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              <h2 className={styles.heading}>Ange humör:</h2>

              <div className={styles.moodGrid}>
                {MOODS.map((mood) => (
                  <button
                    key={mood.value}
                    type="button"
                    className={`${styles.moodButton} ${
                      state.selectedMood === mood.value ? styles.selected : ""
                    }`}
                    onClick={() => setMood(mood.value)}
                    title={mood.label}
                    aria-label={mood.label}
                    data-mood={mood.value}
                  >
                    <mood.component className={styles.emojiSvg} />
                  </button>
                ))}
              </div>

              <div className={styles.logButtonWrapper}>
                <span
                  className={`${styles.tooltipWrapper} ${
                    isFormComplete ? styles.enabled : ""
                  }`}
                  aria-describedby={isFormComplete ? undefined : "log-hint"}
                >
                  <ButtonStd onClick={handleLog} disabled={!isFormComplete}>
                    Logga
                  </ButtonStd>
                </span>
                {!isFormComplete && (
                  <div id="log-hint" className={styles.srOnly}>
                    Välj kategori och humör för att kunna logga
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
