/**
 * @module useTimerReducer
 */

import { useReducer, useCallback, useEffect } from "react";
import type { TimerMode } from "../constants/timerModes";
import type { MoodValue, CategoryValue } from "./useMoodForm";

/**
 * En tidsloggpost för användarens session.
 * @typedef {Object} Session
 * @property {string} mode - Timer-läge (t.ex. "focus", "break").
 * @property {string} start - Starttid i ISO-strängformat.
 * @property {string} end - Sluttid i ISO-strängformat.
 * @property {number} duration - Längd i sekunder.
 * @property {MoodValue} [mood] - Valfri humörsstatus.
 * @property {CategoryValue} [category] - Valfri kategori.
 */
export interface Session {
  mode: string;
  start: string;
  end: string;
  duration: number;
  mood?: MoodValue;
  category?: CategoryValue;
}

/**
 * Timerens interna state.
 * @typedef {Object} TimerState
 * @property {boolean} isActive - Om timern körs.
 * @property {boolean} isPaused - Om timern är pausad.
 * @property {Date|null} startTime - Tidpunkt då timern startades.
 * @property {Record<string,Session[]>} sessions - Loggade sessioner per datum.
 * @property {TimerMode|null} mode - Aktuellt timer-läge eller null.
 * @property {number} durationSeconds - Total varaktighet i sekunder.
 */
export interface TimerState {
  isActive: boolean;
  isPaused: boolean;
  startTime: Date | null;
  sessions: Record<string, Session[]>;
  mode: TimerMode | null;
  durationSeconds: number;
}

/**
 * Åtgärder för timerreduceraren.
 * @typedef {Object} TimerAction
 */
export type TimerAction =
  | { type: "START"; payload: { mode: TimerMode; durationSeconds: number } }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "STOP" }
  | { type: "LOG_SESSION"; payload: Session }
  | {
      type: "UPDATE_SESSION";
      payload: { date: string; index: number; session: Session };
    }
  | { type: "DELETE_SESSION"; payload: { date: string; index: number } }
  | { type: "LOAD_SESSIONS"; payload: Record<string, Session[]> };

/**
 * Reducer för timer-state.
 * @param {TimerState} state - Nuvarande state.
 * @param {TimerAction} action - Åtgärd att applicera.
 * @returns {TimerState} Uppdaterat state.
 * @example
 * const next = timerReducer(current, { type: 'START', payload: { mode: 'focus', durationSeconds: 1500 } });
 */
/**
 * Reducer för timer-state.
 * @param {TimerState} state - Nuvarande state.
 * @param {TimerAction} action - Åtgärd att applicera.
 * @returns {TimerState} Uppdaterat state.
 * @example
 * const next = timerReducer(current, { type: 'START', payload: { mode: 'focus', durationSeconds: 1500 } });
 */
const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        isActive: true,
        isPaused: false,
        startTime: new Date(),
        mode: action.payload.mode,
        durationSeconds: action.payload.durationSeconds,
      };
    case "PAUSE":
      return { ...state, isPaused: true };
    case "RESUME":
      return { ...state, isPaused: false };
    case "STOP":
      return { ...state, isActive: false, isPaused: false, startTime: null };

    case "LOG_SESSION": {
      const today = new Date().toISOString().split("T")[0];
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

    case "UPDATE_SESSION": {
      const { date, index, session } = action.payload;
      const daySessions = [...(state.sessions[date] || [])];
      daySessions[index] = session;
      return {
        ...state,
        sessions: { ...state.sessions, [date]: daySessions },
      };
    }

    case "DELETE_SESSION": {
      const { date, index } = action.payload;
      const daySessions = (state.sessions[date] || []).filter(
        (_, i) => i !== index,
      );
      return {
        ...state,
        sessions: { ...state.sessions, [date]: daySessions },
      };
    }

    case "LOAD_SESSIONS":
      return { ...state, sessions: action.payload };

    default:
      return state;
  }
};

/**
 * Custom hook för timerstate och tillhörande actions.
 * @returns {{
 *   state: TimerState,
 *   dispatch: React.Dispatch<TimerAction>,
 *   actions: {
 *     start: (mode: TimerMode, durationSeconds: number) => void,
 *     pause: () => void,
 *     resume: () => void,
 *     stop: () => void,
 *     togglePause: () => void,
 *     logSession: (session: Session) => void,
 *     updateSession: (date: string, index: number, session: Session) => void,
 *     deleteSession: (date: string, index: number) => void
 *   }
 * }}
 * @example
 * const { state, actions } = useTimerReducer();
 * actions.start('focus', 1500);
 */
export const useTimerReducer = () => {
  const [state, dispatch] = useReducer(timerReducer, {
    isActive: false,
    isPaused: false,
    startTime: null,
    sessions: (() => {
      const stored = localStorage.getItem("timerSessions");
      return stored ? JSON.parse(stored) : {};
    })(),
    mode: null,
    durationSeconds: 0,
  });

  useEffect(() => {
    localStorage.setItem("timerSessions", JSON.stringify(state.sessions));
  }, [state.sessions]);

  const start = useCallback(
    (mode: TimerMode, durationSeconds: number) =>
      dispatch({ type: "START", payload: { mode, durationSeconds } }),
    [],
  );
  const pause = useCallback(() => dispatch({ type: "PAUSE" }), []);
  const resume = useCallback(() => dispatch({ type: "RESUME" }), []);
  const stop = useCallback(() => dispatch({ type: "STOP" }), []);

  const logSession = useCallback(
    (session: Session) => dispatch({ type: "LOG_SESSION", payload: session }),
    [],
  );

  const updateSession = useCallback(
    (date: string, index: number, session: Session) =>
      dispatch({ type: "UPDATE_SESSION", payload: { date, index, session } }),
    [],
  );

  const deleteSession = useCallback(
    (date: string, index: number) =>
      dispatch({ type: "DELETE_SESSION", payload: { date, index } }),
    [],
  );

  const togglePause = useCallback(() => {
    if (state.isPaused) resume();
    else pause();
  }, [state.isPaused, pause, resume]);

  return {
    state,
    dispatch,
    actions: {
      start,
      pause,
      resume,
      stop,
      togglePause,
      logSession,
      updateSession,
      deleteSession,
    },
  };
};
