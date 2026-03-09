import { useReducer, useCallback, useEffect } from 'react';
import type { TimerMode } from '../timerModes';
import type { MoodValue, CategoryValue } from './useMoodForm';

export interface Session {
  mode: string;
  start: string;
  end: string;
  duration: number;
  mood?: MoodValue;
  category?: CategoryValue;
}

export interface TimerState {
  isActive: boolean;
  isPaused: boolean;
  startTime: Date | null;
  sessions: Record<string, Session[]>;
  mode: TimerMode | null;
  durationSeconds: number;
}

export type TimerAction =
  | { type: 'START'; payload: { mode: TimerMode; durationSeconds: number } }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'STOP' }
  | { type: 'LOG_SESSION'; payload: Session }
  | { type: 'LOAD_SESSIONS'; payload: Record<string, Session[]> };

const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        isActive: true,
        isPaused: false,
        startTime: new Date(),
        mode: action.payload.mode,
        durationSeconds: action.payload.durationSeconds,
      };

    case 'PAUSE':
      return {
        ...state,
        isPaused: true,
      };

    case 'RESUME':
      return {
        ...state,
        isPaused: false,
      };

    case 'STOP':
      return {
        ...state,
        isActive: false,
        isPaused: false,
        startTime: null,
      };

    case 'LOG_SESSION': {
      const today = new Date().toISOString().split('T')[0];
      return {
        ...state,
        isActive: false,
        isPaused: false,
        startTime: null,
        sessions: {
          ...state.sessions,
          [today]: [...(state.sessions[today] || []), action.payload],
        },
      };
    }

    case 'LOAD_SESSIONS':
      return {
        ...state,
        sessions: action.payload,
      };

    default:
      return state;
  }
};

export const useTimerReducer = () => {
  const [state, dispatch] = useReducer(timerReducer, {
    isActive: false,
    isPaused: false,
    startTime: null,
    sessions: (() => {
      const stored = localStorage.getItem('timerSessions');
      return stored ? JSON.parse(stored) : {};
    })(),
    mode: null,
    durationSeconds: 0,
  });

  // Persist session history whenever it changes so callers
  // don't need to repeat this side effect in each component.
  useEffect(() => {
    localStorage.setItem('timerSessions', JSON.stringify(state.sessions));
  }, [state.sessions]);

  const start = useCallback(
    (mode: TimerMode, durationSeconds: number) =>
      dispatch({ type: 'START', payload: { mode, durationSeconds } }),
    [],
  );
  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), []);
  const stop = useCallback(() => dispatch({ type: 'STOP' }), []);

  const logSession = useCallback((session: Session) => {
    dispatch({ type: 'LOG_SESSION', payload: session });
  }, []);

  const togglePause = useCallback(() => {
    if (state.isPaused) {
      resume();
    } else {
      pause();
    }
  }, [state.isPaused, pause, resume]);

  return {
    state,
    dispatch,
    actions: { start, pause, resume, stop, togglePause, logSession },
  };
};
