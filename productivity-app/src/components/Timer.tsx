import React, { useEffect, useMemo } from 'react';
import TimerClock from './TimerClock';
import ButtonStd from './ButtonStd';
import ButtonStdRed from './ButtonStdRed';
import ContainerV from './ContainerV';
import ContainerH from './ContainerH';
import type { Session } from '../hooks/useTimerReducer';
import { useTimer } from '../TimerContext';
import { getTimerModeLabel, type TimerMode } from '../timerModes';

interface TimerProps {
  mode: TimerMode;
  onBack: () => void;
}

const Timer: React.FC<TimerProps> = ({ mode, onBack }) => {
  const { state, actions } = useTimer();
  const isCustomRoute = mode === 'custom';
  const isStopwatchRoute = mode === 'stopwatch';

  const [minutesInput, setMinutesInput] = React.useState('');
  const [warning, setWarning] = React.useState('');

  const numericMinutes = parseInt(minutesInput, 10) || 0;

  const routeDuration = useMemo(() => {
    if (isStopwatchRoute) return 0;
    if (isCustomRoute) return numericMinutes * 60;
    return 25 * 60;
  }, [isStopwatchRoute, isCustomRoute, numericMinutes]);

  const effectiveMode: TimerMode = state.isActive && state.mode ? state.mode : mode;
  const isStopwatch = effectiveMode === 'stopwatch';
  const effectiveDuration =
    state.isActive && state.mode === 'custom'
      ? state.durationSeconds
      : routeDuration;

  useEffect(() => {
    document.body.classList.toggle('timer-active-bg', state.isActive && !state.isPaused);
    return () => document.body.classList.remove('timer-active-bg');
  }, [state.isActive, state.isPaused]);

  const formatTime = (date: Date) => date.toTimeString().slice(0, 8);

  const handleStartPause = () => {
    if (isCustomRoute && !state.isActive && numericMinutes <= 0) {
      setWarning('Add time for how long you want to work.');
      return;
    }

    setWarning('');

    if (!state.isActive) {
      actions.start(mode, routeDuration);
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

  return (
    <ContainerV>
      <h2>{getTimerModeLabel(effectiveMode)}</h2>

      {isCustomRoute && (
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
            key={`${isStopwatch ? 'stopwatch' : 'timer'}-${effectiveDuration}-${state.startTime?.getTime() ?? 'idle'}`}
            isActive={state.isActive}
            isPaused={state.isPaused}
            duration={effectiveDuration}
            variant={isStopwatch ? 'stopwatch' : 'timer'}
            startTime={state.startTime ?? undefined}
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
