import { useEffect, useState } from 'react'
import styles from './TimerClock.module.css'

export default function TimerClock({
  isActive,
  isPaused,
  duration,
  onTimerComplete
}) {
  const [timeLeft, setTimeLeft] = useState(duration)

  const radius = 90
  const circumference = 2 * Math.PI * radius
  const progress = timeLeft / duration
  const offset = circumference * (1 - progress)
  const xy = 100
  const stroke = 10

  // Reset när session stoppas
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(duration)
    }
  }, [isActive, duration])

  // Countdown
  useEffect(() => {
    if (!isActive || isPaused) return

    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval)
          onTimerComplete?.()
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, isPaused, onTimerComplete])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')

  return (
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
  )
}
