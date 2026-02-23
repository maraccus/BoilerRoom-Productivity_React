import React, { useEffect } from 'react';
import TimerClock from './TimerClock';
import ButtonStd from './ButtonStd';
import ButtonStdRed from './ButtonStdRed';
import ContainerV from './ContainerV';
import ContainerH from './ContainerH';
import { useTimerReducer, Session } from '../hooks/useTimerReducer';

// Mode-to-duration mapping (i sekunder)
const MODE_DURATIONS: Record<string, number> = {
  deepwork: 25 * 60,
  meeting: 50 * 60,
  break: 5 * 60,
};

interface TimerProps {
  mode: string;
  onBack: () => void;
}

const Timer: React.FC<TimerProps> = ({ mode, onBack }) => {
  const { state, actions } = useTimerReducer();
  const duration = MODE_DURATIONS[mode] || 25 * 60;

  // Spara sessions till localStorage
  useEffect(() => {
    localStorage.setItem('timerSessions', JSON.stringify(state.sessions));
  }, [state.sessions]);

  // Background color när timer körs
  useEffect(() => {
    document.body.classList.toggle('timer-active-bg', state.isActive && !state.isPaused);
    return () => document.body.classList.remove('timer-active-bg');
  }, [state.isActive, state.isPaused]);

  const formatTime = (date: Date) => date.toTimeString().slice(0, 8);

  const handleStartPause = () => {
    if (!state.isActive) {
      actions.start();
    } else {
      actions.togglePause();
    }
  };

  const handleStop = () => {
    if (!state.startTime) return;

    const endTime = new Date();
    const newSession: Session = {
      mode,
      start: formatTime(state.startTime),
      end: formatTime(endTime),
      duration: Math.floor((endTime.getTime() - state.startTime.getTime()) / 1000),
    };

    actions.logSession(newSession);
  };

  const modeNames: Record<string, string> = {
    deepwork: 'Deep Work',
    meeting: 'Meeting',
    break: 'Break',
  };

  return (
    <ContainerV>
      <h2>{modeNames[mode] || mode}</h2>

      <ContainerH>
        <ContainerV>
          <TimerClock
            isActive={state.isActive}
            isPaused={state.isPaused}
            duration={duration}
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
      </ContainerH>

      <ButtonStd onClick={onBack}>
        <p>Back to Modes</p>
      </ButtonStd>
    </ContainerV>
  );
};

export default Timer;
