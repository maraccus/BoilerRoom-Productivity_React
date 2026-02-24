import { useState } from "react";
import styles from "./MoodCheck.module.css";

interface MoodCheckProps {
  onMoodSelected: (mood: string) => void;
}

const MOODS = [
  { emoji: "😴", label: "Utmattad", value: "exhausted" },
  { emoji: "😴", label: "Trött", value: "tired" },
  { emoji: "😴", label: "Okej", value: "okay" },
  { emoji: "😴", label: "Energisk", value: "energetic" },
  { emoji: "😴", label: "Sprudlande", value: "thriving" },
];

export default function MoodCheck({ onMoodSelected }: MoodCheckProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      {/* Den stora vita cirkeln – samma storlek som timern */}
      <div className={styles.circle}>
        {/* Centrerat innehåll */}
        <div className={styles.content}>
          <h2 className={styles.heading}>Hur mår du nu?</h2>

          <div className={styles.moodGrid}>
            {MOODS.map((mood) => (
              <button
                key={mood.value}
                type="button"
                className={`${styles.moodButton} ${
                  selectedMood === mood.value ? styles.selected : ""
                }`}
                onClick={() => {
                  setSelectedMood(mood.value);
                  onMoodSelected(mood.value); // skicka till parent / spara
                }}
              >
                <span className={styles.emoji}>{mood.emoji}</span>
                <span className={styles.label}>{mood.label}</span>
              </button>
            ))}
          </div>

          {selectedMood && (
            <button
              className={styles.continueButton}
              onClick={() => {
                // Här kan du t.ex. gå vidare till nästa skärm
                console.log("Valt humör:", selectedMood);
              }}
            >
              Fortsätt
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
