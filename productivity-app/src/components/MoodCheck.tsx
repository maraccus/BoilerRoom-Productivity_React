import { useNavigate } from "react-router-dom";
import styles from "./MoodCheck.module.css";

import ButtonStd from "./ButtonStd";
import { useMoodForm, MoodValue } from "@/hooks/useMoodForm";
import { useMoodContext } from "@/contexts/MoodContext";

export default function MoodCheck() {
  const navigate = useNavigate();

  let contextValue;
  try {
    contextValue = useMoodContext();
  } catch (error) {
    console.error("MoodContext ERROR:", error);
    return (
      <div style={{ color: "red", padding: "2rem", textAlign: "center" }}>
        FEL: MoodCheck kunde inte hitta MoodProvider. Kontrollera att MoodCheck
        ligger INUTI MoodProvider i App.tsx.
      </div>
    );
  }

  const { onMoodSelected } = contextValue;

  const {
    state,
    setMood,
    setCategory,
    handleLog,
    isFormComplete,
    MOODS,
    CATEGORIES,
  } = useMoodForm((mood) => {
    onMoodSelected(mood);
    navigate("/");
  });

  // Kontrollerar att komponenten når hit:
  console.log("MoodCheck renderades! State:", state);

  return (
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
              className={`${styles.tooltipWrapper} ${isFormComplete ? styles.enabled : ""}`}
              aria-describedby={isFormComplete ? undefined : "log-hint"}
            >
              <ButtonStd
                onClick={handleLog}
                disabled={!isFormComplete}
                variant="primary"
              >
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
  );
}
