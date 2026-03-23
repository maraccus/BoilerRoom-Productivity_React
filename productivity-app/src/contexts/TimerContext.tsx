/**
 * TimerContext-komponenten: delad timerstate + actions.
 * @module TimerContext
 */
import React, { createContext, useContext } from "react";
import { useTimerReducer } from "../hooks/useTimerReducer";

/**
 * Context-typen för timer.
 * @typedef {ReturnType<typeof useTimerReducer>} TimerContextValue
 */
const TimerContext = createContext<
  ReturnType<typeof useTimerReducer> | undefined
>(undefined);

/**
 * Provider som omsluter appen med timer-context.
 * @param {{children: React.ReactNode}} props
 * @param {React.ReactNode} props.children - Komponenten som ska få context.
 * @returns {JSX.Element}
 * @example
 * <TimerProvider>
 *   <App />
 * </TimerProvider>
 */
export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = useTimerReducer();
  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

/**
 * Hook för att använda timercontext.
 * @returns {ReturnType<typeof useTimerReducer>} timer state + actions.
 * @throws {Error} Om hooken används utanför TimerProvider.
 * @example
 * const { state, actions } = useTimer();
 */
export const useTimer = () => {
  const ctx = useContext(TimerContext);
  if (!ctx) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return ctx;
};
