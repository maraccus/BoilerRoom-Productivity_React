import { useEffect, useState } from 'react'
import TimerClock from './TimerClock'
import ButtonStd from './ButtonStd'
import ContainerV from './ContainerV'
import DebugSessions from './DebugSessions'

const DEBUG = true
const DURATION = 120

const TimerWrapper = () => {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [startTime, setStartTime] = useState(null)

  // 🔑 Initiera sessions DIREKT från localStorage
  const [sessions, setSessions] = useState(() => {
    const stored = localStorage.getItem('timerSessions')
    return stored ? JSON.parse(stored) : {}
  })

  // ===== Helpers =====
  const getTodayKey = () => new Date().toISOString().split('T')[0]
  const formatTime = (date) => date.toTimeString().slice(0, 8)

  // ===== Stop + log + reset =====
  const stopAndLogSession = () => {
    if (!startTime) return

    const endTime = new Date()
    const today = getTodayKey()

    const newSession = {
      start: formatTime(startTime),
      end: formatTime(endTime),
      duration: Math.floor((endTime - startTime) / 1000)
    }

    setSessions(prev => ({
      ...prev,
      [today]: [...(prev[today] || []), newSession]
    }))

    setIsActive(false)
    setIsPaused(false)
    setStartTime(null)
  }

  // ===== Buttons =====
  const handleStartPause = () => {
    if (!isActive) {
      setStartTime(new Date())
      setIsActive(true)
      setIsPaused(false)
    } else {
      setIsPaused(prev => !prev)
    }
  }

  const handleStop = () => {
    if (!isActive) return
    stopAndLogSession()
  }

  // ===== Persist =====
  useEffect(() => {
    localStorage.setItem('timerSessions', JSON.stringify(sessions))
  }, [sessions])

  // ===== Background =====
  useEffect(() => {
    document.body.classList.toggle('timer-active-bg', isActive && !isPaused)
    return () => document.body.classList.remove('timer-active-bg')
  }, [isActive, isPaused])

  return (
    <ContainerV>
      <TimerClock
        isActive={isActive}
        isPaused={isPaused}
        duration={DURATION}
        onTimerComplete={handleStop}
      />

      <ButtonStd onClick={handleStartPause}>
        <p>
          {!isActive
            ? 'Start Timer'
            : isPaused
              ? 'Resume Timer'
              : 'Pause Timer'}
        </p>
      </ButtonStd>

      <ButtonStd onClick={handleStop} disabled={!isActive}>
        <p>Stop & Log</p>
      </ButtonStd>

      {DEBUG && <DebugSessions sessions={sessions} />}
    </ContainerV>
  )
}

export default TimerWrapper
