import React, { useEffect } from 'react';
import TimerClock from './TimerClock';
import ButtonStd from './ButtonStd';
import ButtonStdRed from './ButtonStdRed';
import ContainerV from './ContainerV';
import ContainerH from './ContainerH';
import { useTimerReducer, Session } from '../hooks/useTimerReducer';

// Mode-to-duration mapping (i sekunder)
// only used for non-custom timers; custom mode will override using user input
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
  const isCustom = mode === 'custom';
  const isStopwatch = mode === 'meeting';

  // custom duration state (minutes) for the user-set timer
  // keep as string so the user can clear the field without React forcing a 0
  const [minutesInput, setMinutesInput] = React.useState('');
  const [warning, setWarning] = React.useState('');

  // numeric minutes derived from the input (NaN -> 0)
  const numericMinutes = parseInt(minutesInput, 10) || 0;

  // compute duration in seconds for countdown variants
  const duration = isStopwatch
    ? 0
    : isCustom
    ? numericMinutes * 60
    : MODE_DURATIONS[mode] || 25 * 60;

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
    if (isCustom && !state.isActive && numericMinutes <= 0) {
      setWarning('Add time for how long you want to work.');
      return;
    }

    setWarning('');

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
    custom: 'Custom Timer',
    meeting: 'Stopwatch',
    deepwork: 'Deep Work',
    break: 'Break',
  };

  return (
    <ContainerV>
      <h2>{modeNames[mode] || mode}</h2>

      {isCustom && (
        <div style={{ marginBottom: '1rem', position: 'relative', zIndex: 1000 }}>
          <label>
            Set minutes: 
            <input
              type="number"
              min="0"
              value={minutesInput}
              disabled={state.isActive}
              onChange={e => {
                setMinutesInput(e.target.value);
                if (warning) setWarning('');
              }}
              autoFocus
              style={{ width: '4rem', marginLeft: '0.5rem', position: 'relative', zIndex: 1000, pointerEvents: 'auto' }}
            />
          </label>
          {warning && (
            <p style={{ color: 'red', marginTop: '0.5rem' }}>{warning}</p>
          )}
        </div>
      )}

      <ContainerH>
        <ContainerV>
          <TimerClock
            key={`${isStopwatch ? 'stopwatch' : 'timer'}-${duration}`}
            isActive={state.isActive}
            isPaused={state.isPaused}
            duration={duration}
            variant={isStopwatch ? 'stopwatch' : 'timer'}
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
