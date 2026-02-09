import { useEffect, useState } from 'react'
import TimerClock from './TimerClock'
import ButtonStd from './ButtonStd'
import DebugSessions from './DebugSessions'
import ContainerV from './ContainerV'

const TimerWrapper = () => {
  const DEBUG = true

  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const [sessions, setSessions] = useState({})
  const [startTime, setStartTime] = useState(null)

  const DURATION = 120

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

  // ===== localStorage =====
  useEffect(() => {
    localStorage.setItem('timerSessions', JSON.stringify(sessions))
  }, [sessions])

  useEffect(() => {
    const stored = localStorage.getItem('timerSessions')
    if (stored) setSessions(JSON.parse(stored))
  }, [])

  // ===== Background effect =====
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
        <p>Stop Timer & Log</p>
      </ButtonStd>

      {DEBUG && <DebugSessions sessions={sessions} />}
    </ContainerV>
  )
}

export default TimerWrapper
