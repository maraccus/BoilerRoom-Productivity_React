import { useState } from "react";
import styles from "./MoodCheck.module.css";

// Importera SVG:er som komponenter
import ExhaustedSVG from "@/assets/MoodCheckEmoji/exhausted.svg?react";
import TiredSVG from "@/assets/MoodCheckEmoji/tired.svg?react";
import OkaySVG from "@/assets/MoodCheckEmoji/okay.svg?react";
import EnergeticSVG from "@/assets/MoodCheckEmoji/energetic.svg?react";
import ThrivingSVG from "@/assets/MoodCheckEmoji/thriving.svg?react";

interface MoodCheckProps {
  onMoodSelected: (mood: string) => void;
}

const MOODS = [
  { component: ExhaustedSVG, label: "Utmattad", value: "exhausted" },
  { component: TiredSVG, label: "Trött", value: "tired" },
  { component: OkaySVG, label: "Okej", value: "okay" },
  { component: EnergeticSVG, label: "Energisk", value: "energetic" },
  { component: ThrivingSVG, label: "Sprudlande", value: "thriving" },
] as const;

export default function MoodCheck({ onMoodSelected }: MoodCheckProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <div className={styles.content}>
          <h2 className={styles.heading}>Hur känner du dig?</h2>

          <div className={styles.moodGrid}>
            {MOODS.map((mood) => (
              <button
                key={mood.value}
                type="button"
                className={`${styles.moodButton} ${selectedMood === mood.value ? styles.selected : ""}`}
                onClick={() => {
                  setSelectedMood(mood.value);
                  onMoodSelected(mood.value);
                }}
                title={mood.label} // ← tooltip vid hover!
                aria-label={mood.label}
              >
                <mood.component className={styles.emojiSvg} />
              </button>
            ))}
          </div>

          {selectedMood && (
            <button
              className={styles.continueButton}
              onClick={() => console.log("Valt:", selectedMood)}
            >
              Fortsätt
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
