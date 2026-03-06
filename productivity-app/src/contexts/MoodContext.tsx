import { createContext, useContext, ReactNode } from "react";
import { MoodValue } from "@/hooks/useMoodForm";

interface MoodContextType {
  onMoodSelected: (mood: MoodValue) => void;
}

// Context här:
const MoodContext = createContext<MoodContextType | undefined>(undefined);

// Custom Hook, gör handleMoodSelected tillgänglig för MoodCheck (App.tsx):
export function useMoodContext(): MoodContextType {
  const context = useContext(MoodContext);

  if (context === undefined) {
    throw new Error("useMoodContext must be used within a MoodProvider");
  }

  return context;
}

// Här delas valt humör (onMoodSelected), prop drilling undviks.
interface MoodProviderProps {
  children: ReactNode;
  onMoodSelected: (mood: MoodValue) => void;
}

// Provider tar emot callback från App.tsx, skickas till barn (MoodCheck)
// MoodCheck hämtar med context (useMoodContext)
export function MoodProvider({ children, onMoodSelected }: MoodProviderProps) {
  const value = { onMoodSelected };

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}
