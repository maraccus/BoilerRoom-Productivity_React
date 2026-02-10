import { useEffect, useState } from 'react'
import TimerClock from './TimerClock'
import ButtonStd from './ButtonStd'
import ButtonStdRed from './ButtonStdRed'
import ContainerV from './ContainerV'
import ContainerH from './ContainerH'
import DebugSessions from './DebugSessions'

const DEBUG = true
const DURATION = 120

const TimerWrapper = () => {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [startTime, setStartTime] = useState(null)

  // Initiera sessions från localStorage
  const [sessions, setSessions] = useState(() => {
    const stored = localStorage.getItem('timerSessions')
    return stored ? JSON.parse(stored) : {}
  })

  const getTodayKey = () => new Date().toISOString().split('T')[0]
  const formatTime = (date) => date.toTimeString().slice(0, 8)

  // Stop and log
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

  // Buttons
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

  // Local storage
  useEffect(() => {
    localStorage.setItem('timerSessions', JSON.stringify(sessions))
  }, [sessions])

  // Change background color to green
  useEffect(() => {
    document.body.classList.toggle('timer-active-bg', isActive && !isPaused)
    return () => document.body.classList.remove('timer-active-bg')
  }, [isActive, isPaused])

  return (
    <ContainerH>
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

      <ButtonStdRed onClick={handleStop} disabled={!isActive}>
        <p>Stop & Log</p>
      </ButtonStdRed>
      </ContainerV>
      
            <ContainerV>
              {DEBUG && <DebugSessions sessions={sessions} />}
            </ContainerV>
      
    </ContainerH>
  )
}

export default TimerWrapper
