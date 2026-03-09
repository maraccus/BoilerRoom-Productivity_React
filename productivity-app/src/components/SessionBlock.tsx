import React from "react";
import type { Session } from "../hooks/useTimerReducer";
import { getBlockPosition, formatDuration } from "../utils/timeUtils";
import styles from "./CalendarHistory.module.css";

interface SessionBlockProps {
  session: Session;
}

const SessionBlock: React.FC<SessionBlockProps> = ({ session }) => {
  const { leftPercent, widthPercent } = getBlockPosition(session.start, session.end);

  const topPercent = leftPercent;
  const heightPercent = widthPercent;

  if (heightPercent <= 0) return null;

  const details = [
    `Start: ${session.start.slice(0, 5)}`,
    `End: ${session.end.slice(0, 5)}`,
    `Duration: ${formatDuration(session.duration)}`,
    `Mode: ${session.mode}`,
  ];

  if (session.category) {
    details.push(`Category: ${session.category}`);
  }
  if (session.mood) {
    details.push(`Mood: ${session.mood}`);
  }

  const title = details.join("\n");

  return (
    <div
      className={styles.sessionBlock}
      style={{
        top: `${topPercent}%`,
        height: `${heightPercent}%`,
        minHeight: "6px",
      }}
      title={title}
      aria-label={title}
    >
      <span className={styles.sessionLabel}>{formatDuration(session.duration)}</span>
    </div>
  );
};

export default SessionBlock;
