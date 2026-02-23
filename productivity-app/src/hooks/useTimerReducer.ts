import { useReducer, useCallback } from 'react';

export interface Session {
  mode: string;
  start: string;
  end: string;
  duration: number;
}

export interface TimerState {
  isActive: boolean;
  isPaused: boolean;
  startTime: Date | null;
  sessions: Record<string, Session[]>;
}

export type TimerAction =
  | { type: 'START' }
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
  });

  const start = useCallback(() => dispatch({ type: 'START' }), []);
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
