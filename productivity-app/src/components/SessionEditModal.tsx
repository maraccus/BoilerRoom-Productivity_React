import React, { useState } from "react";
import type { Session } from "../hooks/useTimerReducer";
import { MOODS, CATEGORIES } from "../hooks/useMoodForm";
import type { MoodValue, CategoryValue } from "../hooks/useMoodForm";
import styles from "./SessionEditModal.module.css";
import { moodEmojis } from "@/constants/Emoji";

interface Props {
  session: Session;
  onSave: (updated: Session) => void;
  onDelete: () => void;
  onClose: () => void;
}

const timeToSeconds = (t: string): number => {
  const [h, m, s = 0] = t.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

const SessionEditModal: React.FC<Props> = ({ session, onSave, onDelete, onClose }) => {
  const [start, setStart] = useState(session.start.slice(0, 5));
  const [end, setEnd] = useState(session.end.slice(0, 5));
  const [mood, setMood] = useState<MoodValue | "">(session.mood ?? "");
  const [category, setCategory] = useState<CategoryValue | "">(session.category ?? "");
  const [mode, setMode] = useState(session.mode);

  const handleSave = () => {
    const startFull = `${start}:00`;
    const endFull = `${end}:00`;
    const calculated = timeToSeconds(endFull) - timeToSeconds(startFull);
    const duration = calculated > 0 ? calculated : session.duration;

    onSave({
      ...session,
      start: startFull,
      end: endFull,
      duration,
      mood: mood !== "" ? Number(mood) as MoodValue : undefined,
      category: category !== "" ? (category as CategoryValue) : undefined,
      mode,
    });
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h3 className={styles.title}>Edit Session</h3>

        <div className={styles.field}>
          <label>Start</label>
          <input type="time" value={start} onChange={e => setStart(e.target.value)} />
        </div>

        <div className={styles.field}>
          <label>End</label>
          <input type="time" value={end} onChange={e => setEnd(e.target.value)} />
        </div>

        <div className={styles.field}>
          <label>Mode</label>
          <select value={mode} onChange={e => setMode(e.target.value)}>
            <option value="custom">Custom</option>
            <option value="stopwatch">Stopwatch</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value as CategoryValue)}>
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Mood</label>
          <select value={mood} onChange={e => setMood(e.target.value as MoodValue)}>
            {MOODS.map(m => (
              <option key={m.value} value={m.value}>{m.key}</option>
            ))}
          </select>
        </div>

        <div className={styles.actions}>
          <button className={styles.deleteBtn} onClick={onDelete}>Delete</button>
          <div className={styles.actionsSpacer} />
          <button className={styles.saveBtn} onClick={handleSave}>Save</button>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SessionEditModal;