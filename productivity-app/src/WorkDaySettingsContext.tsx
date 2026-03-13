import React, { createContext, useContext, useState, useCallback } from "react";

export interface WorkDaySettings {
  startHour: number;
  endHour: number;
}

interface WorkDaySettingsContextValue {
  settings: WorkDaySettings;
  update: (next: Partial<WorkDaySettings>) => void;
}

const STORAGE_KEY = "workDaySettings";
const DEFAULTS: WorkDaySettings = { startHour: 8, endHour: 17 };

const load = (): WorkDaySettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULTS, ...JSON.parse(stored) };
  } catch {}
  return DEFAULTS;
};

const WorkDaySettingsContext =
  createContext<WorkDaySettingsContextValue | undefined>(undefined);

export const WorkDaySettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<WorkDaySettings>(load);

  const update = useCallback((next: Partial<WorkDaySettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...next };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <WorkDaySettingsContext.Provider value={{ settings, update }}>
      {children}
    </WorkDaySettingsContext.Provider>
  );
};

export const useWorkDaySettings = () => {
  const ctx = useContext(WorkDaySettingsContext);
  if (!ctx) {
    throw new Error("useWorkDaySettings must be used within a WorkDaySettingsProvider");
  }
  return ctx;
};