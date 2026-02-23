import { useEffect } from 'react'
import TimerClock from './TimerClock'
import ButtonStd from './ButtonStd'
import ButtonStdRed from './ButtonStdRed'
import ContainerV from './ContainerV'
import ContainerH from './ContainerH'
import DebugSessions from './DebugSessions'
import { useTimerReducer } from '../hooks/useTimerReducer'

const DEBUG = true
const DURATION = 120

const TimerWrapper = () => {
  const { state, actions } = useTimerReducer()

  const getTodayKey = () => new Date().toISOString().split('T')[0]
  const formatTime = (date) => date.toTimeString().slice(0, 8)

  const handleStartPause = () => {
    if (!state.isActive) {
      actions.start()
    } else {
      actions.togglePause()
    }
  }

  // Stop and log
  const handleStop = () => {
    if (!state.startTime) return

    const endTime = new Date()
    const today = getTodayKey()

    const newSession = {
      start: formatTime(state.startTime),
      end: formatTime(endTime),
      duration: Math.floor((endTime - state.startTime) / 1000)
    }

    actions.logSession(newSession)
  }

  // Local storage
  useEffect(() => {
    localStorage.setItem('timerSessions', JSON.stringify(state.sessions))
  }, [state.sessions])

  // Change background color to green
  useEffect(() => {
    document.body.classList.toggle('timer-active-bg', state.isActive && !state.isPaused)
    return () => document.body.classList.remove('timer-active-bg')
  }, [state.isActive, state.isPaused])

  return (
    <ContainerH>
      <ContainerV>
        <TimerClock
          isActive={state.isActive}
          isPaused={state.isPaused}
          duration={DURATION}
          onTimerComplete={handleStop}
        />

        <ButtonStd onClick={handleStartPause}>
          <p>
            {!state.isActive
              ? 'Start Timer'
              : state.isPaused
                ? 'Resume Timer'
                : 'Pause Timer'}
          </p>
        </ButtonStd>

        <ButtonStdRed onClick={handleStop} disabled={!state.isActive}>
          <p>Stop & Log</p>
        </ButtonStdRed>
      </ContainerV>

      <ContainerV>
        {DEBUG && <DebugSessions sessions={state.sessions} />}
      </ContainerV>
    </ContainerH>
  )
}

export default TimerWrapper
