import { useEffect, useState } from 'react'
import styles from './TimerClock.module.css'

export default function TimerClock({
  isActive,
  isPaused,
  duration,
  onTimerComplete,
  variant = 'timer'
}) {
  
  const [time, setTime] = useState(() => (variant === 'stopwatch' ? 0 : duration));

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = variant === 'timer' && duration > 0 ? time / duration : 1;
  const offset = circumference * (1 - progress);
  const xy = 100;
  const stroke = 10;


  // Tick interval
  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      setTime(t => {
        if (variant === 'stopwatch') {
          return t + 1;
        }

        // countdown
        if (t <= 1) {
          clearInterval(interval);
          onTimerComplete?.();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, variant, onTimerComplete]);

  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');

  return (
    <>
      {/* TIMER / STOPWATCH */}
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
          {variant === 'timer' && (
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
          )}
        </svg>

        <div className={styles.currentTime}>
          {new Date().toLocaleTimeString('sv-SE', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>

        <div className={styles.time}>
          {minutes}:{seconds}
        </div>
      </div>
    </>
  );
}
