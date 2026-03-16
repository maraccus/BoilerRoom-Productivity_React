import React from "react";
import type { Session } from "../hooks/useTimerReducer";
import { formatDuration } from "../utils/timeUtils";
import { MOODS } from "../hooks/useMoodForm";
import styles from "./CalendarHistory.module.css";

// Cool-tone transparent colors per category
const CATEGORY_COLORS: Record<string, string> = {
  deep_work: "rgba(99, 102, 241, 0.75)",  // indigo
  meeting:   "rgba(14, 165, 233, 0.75)",  // sky blue
  pause:     "rgba(20, 184, 166, 0.75)",  // teal
};

const CATEGORY_COLORS_HOVER: Record<string, string> = {
  deep_work: "rgba(79, 70, 229, 0.92)",
  meeting:   "rgba(2, 132, 199, 0.92)",
  pause:     "rgba(13, 148, 136, 0.92)",
};

const DEFAULT_COLOR       = "rgba(99, 102, 241, 0.75)";
const DEFAULT_COLOR_HOVER = "rgba(79, 70, 229, 0.92)";

interface SessionBlockProps {
  session: Session;
  /** vertical position within the timeline (0–100) */
  topPercent: number;
  heightPercent: number;
  onClick: () => void;
}

const SessionBlock: React.FC<SessionBlockProps> = ({
  session,
  topPercent,
  heightPercent,
  onClick,
}) => {
  // Only skip truly zero-duration or out-of-window sessions
  if (heightPercent < 0.1) return null;

  const moodLabel = session.mood
    ? MOODS.find(m => m.value === session.mood)?.label ?? String(session.mood)
    : null;

  const tooltip = [
    `${session.start.slice(0, 5)} – ${session.end.slice(0, 5)}`,
    `Duration: ${formatDuration(session.duration)}`,
    `Mode: ${session.mode}`,
    session.category && `Category: ${session.category}`,
    moodLabel && `Mood: ${moodLabel}`,
  ]
    .filter(Boolean)
    .join("\n");

  const categoryKey = session.category ?? "";
  const bg    = CATEGORY_COLORS[categoryKey]       ?? DEFAULT_COLOR;
  const bgHover = CATEGORY_COLORS_HOVER[categoryKey] ?? DEFAULT_COLOR_HOVER;

  return (
    <div
      className={styles.sessionBlock}
      style={{
        top: `${topPercent}%`,
        height: `${heightPercent}%`,
        minHeight: "6px",
        background: bg,
        // CSS variable so the :hover rule in CSS can pick it up
        ["--block-hover-bg" as string]: bgHover,
      }}
      title={tooltip}
      aria-label={tooltip}
      onClick={onClick}
    >
      <span className={styles.sessionLabel}>{formatDuration(session.duration)}</span>
    </div>
  );
};

export default SessionBlock;