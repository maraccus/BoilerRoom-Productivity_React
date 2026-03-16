import { useEffect, useState } from "react";
import styles from "./TimerClock.module.css";

export default function TimerClock({
  isActive,
  isPaused,
  duration,
  onTimerComplete,
  variant = "timer",
  startTime,
}) {
  const [elapsed, setElapsed] = useState(() => {
    if (!startTime) return 0;
    const startedAt = startTime instanceof Date ? startTime : new Date(startTime);
    return (Date.now() - startedAt.getTime()) / 1000;
  });

  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("sv-SE", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      setElapsed((prev) => {
        const step = 0.1;
        const next = prev + step;

        if (variant === "timer" && duration > 0) {
          if (next >= duration) {
            onTimerComplete?.();
            return duration;
          }
        }

        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, isPaused, variant, duration, onTimerComplete]);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress =
    variant === "timer"
      ? duration > 0
        ? Math.max((duration - elapsed) / duration, 0)
        : 1
      : (elapsed % 60) / 60;

  const offset = circumference * (1 - progress);
  const xy = 100;
  const stroke = 10;

  const totalSeconds =
    variant === "stopwatch"
      ? Math.floor(elapsed)
      : duration > 0
        ? Math.max(duration - Math.floor(elapsed), 0)
        : 0;

  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return (
    <div className={styles.clockBlock}>
      <div className={styles.currentTime}>{currentTime}</div>

      <div className={styles.timer}>
        <svg className={styles.svg} viewBox="0 0 200 200">
          <circle
            className={styles.background}
            cx={xy}
            cy={xy}
            r={radius}
            strokeWidth={stroke}
            fill="none"
          />
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
        </svg>

        <div className={styles.time}>
          {minutes}:{seconds}
        </div>
      </div>
    </div>
  );
}
