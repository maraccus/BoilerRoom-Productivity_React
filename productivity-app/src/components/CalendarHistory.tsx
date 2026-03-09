import React, { useMemo } from "react";
import { useTimer } from "../TimerContext";
import type { Session } from "../hooks/useTimerReducer";
import { formatDuration } from "../utils/timeUtils";
import SessionBlock from "./SessionBlock";
import styles from "./CalendarHistory.module.css";

type DayConfig = {
  label: string;
  date: string;
};

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toLocalDateString = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getCurrentWeek = (): DayConfig[] => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const diffToMonday = (dayOfWeek + 6) % 7;

  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() - diffToMonday);

  const days: DayConfig[] = [];
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push({
      label: weekdayLabels[d.getDay()],
      date: toLocalDateString(d),
    });
  }
  return days;
};

const prettyDayTitle = (dateStr: string) => {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", { weekday: "long" });
};

const prettyDaySubtitle = (dateStr: string) => {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
};

const CalendarHistory: React.FC = () => {
  const { state } = useTimer();
  const weekDays = useMemo(() => getCurrentWeek(), []);

  /* const sessionsByDay: Record<string, Session[]> = state.sessions || {}; */ // Original code

// Dummy data for testing 60 -82
const sessionsByDay: Record<string, Session[]> = useMemo(() => {
  const base = state.sessions || {};

  const demoSession: Session = {
    mode: "demo",
    start: "09:00:00",
    end: "13:00:00",
    duration: 4 * 60 * 60,
  };

  const weekDays = getCurrentWeek();

  const result: Record<string, Session[]> = {};

  weekDays.forEach((day) => {
    const realSessions = base[day.date] || [];

    result[day.date] = [...realSessions, demoSession];
  });

  return result;
}, [state.sessions]);

  const totalsByDay = useMemo(() => {
    return weekDays.reduce<Record<string, number>>((acc, day) => {
      const sessions = sessionsByDay[day.date] || [];
      acc[day.date] = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
      return acc;
    }, {});
  }, [sessionsByDay, weekDays]);

  return (
    <div className={styles.calendarContainer}>
      <h1 className={styles.heading}>Weekly Session History</h1>

      <div className={styles.weekContainer}>
        {weekDays.map((day) => {
          const sessions = sessionsByDay[day.date] || [];
          const totalSeconds = totalsByDay[day.date] || 0;

          return (
            <section key={day.date} className={styles.dayColumn}>
              {/* Header */}
              <div className={styles.dayHeader}>
                <h2 className={styles.dayTitle}>{prettyDayTitle(day.date)}</h2>
                <h3 className={styles.daySubtitle}>{prettyDaySubtitle(day.date)}</h3>
                <p className={styles.dayTotal}>
                  {totalSeconds > 0 ? formatDuration(totalSeconds) : "0m"}
                </p>
              </div>

              {/* Timeline area (24 rows) */}
              <div className={styles.timelineArea}>
                {Array.from({ length: 24 }).map((_, hour) => (
                  <div key={hour} className={styles.containerDay}>
                    <div className={styles.dividerLine} />
                    <div className={styles.containerInfo}>
                      <span className={styles.hourLabel}>
                        {hour.toString().padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                ))}
                <div className={styles.dividerLine} />

                {/* Overlay: session blocks */}
                <div className={styles.blocksLayer}>
                  {sessions.map((session, idx) => (
                    <SessionBlock key={`${day.date}-${idx}`} session={session} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarHistory;