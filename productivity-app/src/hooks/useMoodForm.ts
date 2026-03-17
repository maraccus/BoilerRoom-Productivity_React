import { useReducer } from "react";

import ExhaustedSVG from "@/assets/MoodCheckEmoji/exhausted.svg?react";
import TiredSVG from "@/assets/MoodCheckEmoji/tired.svg?react";
import OkaySVG from "@/assets/MoodCheckEmoji/okay.svg?react";
import EnergeticSVG from "@/assets/MoodCheckEmoji/energetic.svg?react";
import ThrivingSVG from "@/assets/MoodCheckEmoji/thriving.svg?react";

export const MOODS = [
  { component: ExhaustedSVG, label: "Utmattad", value: 1, key: "exhausted" },
  { component: TiredSVG, label: "Trött", value: 2, key: "tired" },
  { component: OkaySVG, label: "Okej", value: 3, key: "okay" },
  { component: EnergeticSVG, label: "Energisk", value: 4, key: "energetic" },
  { component: ThrivingSVG, label: "Sprudlande", value: 5, key: "thriving" },
] as const;

export const CATEGORIES = [
  { label: "Work", value: "work"},
  { label: "Deep work", value: "deep_work" },
  { label: "Meet", value: "meeting" },
  { label: "Pause", value: "pause" },
] as const;

export type MoodValue = (typeof MOODS)[number]["value"];
export type CategoryValue = (typeof CATEGORIES)[number]["value"];

type FormState = {
  selectedMood: MoodValue | null;
  selectedCategory: CategoryValue | null;
};

type FormAction =
  | { type: "SET_MOOD"; payload: MoodValue }
  | { type: "SET_CATEGORY"; payload: CategoryValue }
  | { type: "RESET" };

// Default-värde:
const initialState: FormState = {
  selectedMood: null,
  selectedCategory: null,
};

// Reducer för uppdateringar (state-förändringar):
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_MOOD":
      return { ...state, selectedMood: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// CUSTOM HOOK: Tar emot en callback som inkluderar onMoodSelected och navigate
export function useMoodForm(
  onComplete: (data: { mood: MoodValue; category: CategoryValue }) => void,
) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Loggning och callback
  const handleLog = () => {
    if (!state.selectedMood || !state.selectedCategory) return;

    const logEntry = {
      mood: state.selectedMood,
      category: state.selectedCategory,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("latestMoodLog", JSON.stringify(logEntry));

    onComplete({ mood: state.selectedMood, category: state.selectedCategory });

    dispatch({ type: "RESET" });
  };

  const isFormComplete = Boolean(state.selectedMood && state.selectedCategory);

  const setMood = (value: MoodValue) =>
    dispatch({ type: "SET_MOOD", payload: value });
  const setCategory = (value: CategoryValue) =>
    dispatch({ type: "SET_CATEGORY", payload: value });

  return {
    state,
    setMood,
    setCategory,
    handleLog,
    isFormComplete,
    MOODS,
    CATEGORIES,
  };
}
