import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MoodCheck.module.css";

import ExhaustedSVG from "@/assets/MoodCheckEmoji/exhausted.svg?react";
import TiredSVG from "@/assets/MoodCheckEmoji/tired.svg?react";
import OkaySVG from "@/assets/MoodCheckEmoji/okay.svg?react";
import EnergeticSVG from "@/assets/MoodCheckEmoji/energetic.svg?react";
import ThrivingSVG from "@/assets/MoodCheckEmoji/thriving.svg?react";

import ButtonStd from "./ButtonStd";

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

const CATEGORIES = [
  { label: "Deep work", value: "deep_work" },
  { label: "Möte", value: "meeting" },
  { label: "Paus", value: "pause" },
];

export default function MoodCheck({ onMoodSelected }: MoodCheckProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLog = () => {
    if (!selectedMood || !selectedCategory) return;

    const logEntry = {
      mood: selectedMood,
      category: selectedCategory,
      timestamp: new Date().toISOString(),
    };

    // Sparae i localStorage – överskriver tidigare logg (enklast just nu)
    localStorage.setItem("latestMoodLog", JSON.stringify(logEntry));

    onMoodSelected(selectedMood);

    // Kolla att det fungerar att gå tillbaka till startsidan när du mergat med DEV
    navigate("/");
  };

  const isFormComplete = Boolean(selectedMood && selectedCategory);

  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <div className={styles.content}>
          <h3 className={styles.heading}>Ange kategori:</h3>

          <select
            className={styles.categorySelect}
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
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

          <h2 className={styles.heading}>Hur känner du dig?</h2>

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
                }}
                title={mood.label}
                aria-label={mood.label}
                data-mood={mood.value}
              >
                <mood.component className={styles.emojiSvg} />
              </button>
            ))}
          </div>

          <div className={styles.logButtonWrapper}>
            <ButtonStd
              onClick={handleLog}
              disabled={!isFormComplete}
              variant="primary"
              title={
                !isFormComplete
                  ? "Välj både kategori och humör för att kunna logga"
                  : undefined
              }
            >
              Logga
            </ButtonStd>
          </div>
        </div>
      </div>
    </div>
  );
}
