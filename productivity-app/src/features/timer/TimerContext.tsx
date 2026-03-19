import React, { createContext, useContext } from "react";
import { useTimerReducer } from "./useTimerReducer";

const TimerContext = createContext<
  ReturnType<typeof useTimerReducer> | undefined
>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = useTimerReducer();
  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

export const useTimer = () => {
  const ctx = useContext(TimerContext);
  if (!ctx) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return ctx;
};
