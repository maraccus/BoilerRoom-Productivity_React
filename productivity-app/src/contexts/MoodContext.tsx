import { createContext, useContext, ReactNode } from "react";
import { MoodValue } from "@/hooks/useMoodForm";

interface MoodContextType {
  onMoodSelected: (mood: MoodValue) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function useMoodContext(): MoodContextType {
  const context = useContext(MoodContext);

  if (context === undefined) {
    throw new Error("useMoodContext must be used within a MoodProvider");
  }

  return context;
}

interface MoodProviderProps {
  children: ReactNode;
  onMoodSelected: (mood: MoodValue) => void;
}

export function MoodProvider({ children, onMoodSelected }: MoodProviderProps) {
  const value = { onMoodSelected };

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}
