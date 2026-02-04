import { useEffect, useState } from "react";
import styles from "./TimerClock.module.css";

export default function Timer({
  isActive,
  duration,
  ended = false,
  onElapsedChange,
  endedContent = null,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const progress = timeLeft / duration;
  const offset = circumference * (1 - progress);
  const xy = 100;
  const stroke = 10;

  useEffect(() => {
    if (ended && onElapsedChange) {
      onElapsedChange(duration - timeLeft);
    }
  }, [ended, duration, timeLeft, onElapsedChange]);

  useEffect(() => {
    if (!isActive || ended) return;

    const interval = setInterval(() => {
      console.log("Timer Started/Tick");
      setTimeLeft((t) => {
        if (t <= 0) {
          clearInterval(interval);
          document.body.classList.remove("timer-active-bg");
          if (onElapsedChange) {
            onElapsedChange(duration);
          }
          return 0;
        }
        const newTime = t - 1;
        if (onElapsedChange) {
          onElapsedChange(duration - newTime);
        }
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("Timer Stopped");
    };
  }, [isActive, ended, duration, onElapsedChange]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className={styles.timer}>
      <svg className={styles.svg} viewBox="0 0 200 200">
        {ended ? (
          <circle
            className={styles.endedCircle}
            cx={xy}
            cy={xy}
            r={radius}
            strokeWidth={0}
            fill="#ffffff"
          />
        ) : (
          <>
            {/* Background circle */}
            <circle
              className={styles.background}
              cx={xy}
              cy={xy}
              r={radius}
              strokeWidth={stroke}
              fill="none"
            />

            {/* Progress circle */}
            <circle
              className={styles.progress}
              cx={xy}
              cy={xy}
              r={radius}
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 100 100)"
            />
          </>
        )}
      </svg>

      {ended ? (
        <div className={styles.endedContent}>{endedContent}</div>
      ) : (
        <>
          <div className={styles.currentTime}>
            {new Date().toLocaleTimeString("sv-SE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className={styles.time}>
            {minutes}:{seconds}
          </div>
        </>
      )}
    </div>
  );
}
