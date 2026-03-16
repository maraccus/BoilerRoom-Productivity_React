import React, { useMemo, useState } from "react";
import { useTimer } from "../TimerContext";
import type { Session } from "../hooks/useTimerReducer";
import { formatDuration } from "../utils/timeUtils";
import { useWorkDaySettings } from "../WorkDaySettingsContext";
import SessionBlock from "./SessionBlock";
import SessionEditModal from "./SessionEditModal";
import styles from "./CalendarHistory.module.css";

const toLocalDateString = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const getCurrentWeek = () => {
  const today = new Date();
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { date: toLocalDateString(d), jsDay: d.getDay() };
  });
};

const prettyHeader = (dateStr: string) => {
  const d = new Date(`${dateStr}T00:00:00`);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
    sub: d.toLocaleDateString("en-US", { month: "long", day: "numeric" }),
  };
};

const timeStringToFractional = (t: string): number => {
  const [h, m, s = 0] = t.split(":").map(Number);
  return h + m / 60 + s / 3600;
};

const blockPosition = (
  start: string,
  end: string,
  windowStart: number,
  windowEnd: number,
): { topPercent: number; heightPercent: number } => {
  const span = windowEnd - windowStart;
  if (span <= 0) return { topPercent: 0, heightPercent: 0 };

  const s = Math.max(timeStringToFractional(start), windowStart);
  const e = Math.min(timeStringToFractional(end), windowEnd);

  return {
    topPercent: ((s - windowStart) / span) * 100,
    heightPercent: Math.max(((e - s) / span) * 100, 0.5),
  };
};

interface EditTarget {
  date: string;
  index: number;
  session: Session;
}

const CalendarHistory: React.FC = () => {
  const { state, actions } = useTimer();
  const { settings } = useWorkDaySettings();
  const { startHour, endHour } = settings;

  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);

  const weekDays = useMemo(() => getCurrentWeek(), []);

  const sessionsByDay = useMemo(() => {
    return Object.fromEntries(
      weekDays.map((day) => [day.date, state.sessions[day.date] ?? []]),
    );
  }, [state.sessions, weekDays]);

  const totalsByDay = useMemo(() => {
    return Object.fromEntries(
      weekDays.map((day) => [
        day.date,
        (sessionsByDay[day.date] ?? []).reduce(
          (sum, s) => sum + (s.duration || 0),
          0,
        ),
      ]),
    );
  }, [sessionsByDay, weekDays]);

  const minVisibleRows = 10;
  const selectedRowCount = endHour - startHour;
  const visibleRowCount = Math.max(selectedRowCount, minVisibleRows);
  const visibleEndHour = startHour + visibleRowCount;

  const hourRows = useMemo(() => {
    return Array.from({ length: visibleRowCount }, (_, i) => {
      const h = startHour + i;
      return { h, label: String(h).padStart(2, "0") };
    });
  }, [startHour, visibleRowCount]);

  const handleSaveEdit = (updated: Session) => {
    if (!editTarget) return;
    actions.updateSession(editTarget.date, editTarget.index, updated);
    setEditTarget(null);
  };

  const handleDeleteEdit = () => {
    if (!editTarget) return;
    actions.deleteSession(editTarget.date, editTarget.index);
    setEditTarget(null);
  };

  return (
    <div className={styles.calendarContainer}>
      <h1 className={styles.heading}>Weekly Session History</h1>

      <div className={styles.weekContainer}>
        {weekDays.map((day) => {
          const sessions = sessionsByDay[day.date] ?? [];
          const total = totalsByDay[day.date] ?? 0;
          const { weekday, sub } = prettyHeader(day.date);

          return (
            <section key={day.date} className={styles.dayColumn}>
              <div className={styles.dayHeader}>
                <h2 className={styles.dayTitle}>{weekday}</h2>
                <h3 className={styles.daySubtitle}>{sub}</h3>
                <p className={styles.dayTotal}>
                  {total > 0 ? formatDuration(total) : "0m"}
                </p>
              </div>

              <div className={styles.timelineArea}>
                {hourRows.map(({ h, label }) => (
                  <div key={h} className={styles.containerDay}>
                    <div className={styles.dividerLine} />
                    <div className={styles.containerInfo}>
                      <span className={styles.hourLabel}>{label}</span>
                    </div>
                  </div>
                ))}
                <div className={styles.dividerLine} />

                <div className={styles.blocksLayer}>
                  {sessions.map((session, idx) => {
                    const { topPercent, heightPercent } = blockPosition(
                      session.start,
                      session.end,
                      startHour,
                      visibleEndHour,
                    );

                    return (
                      <SessionBlock
                        key={`${day.date}-${idx}`}
                        session={session}
                        topPercent={topPercent}
                        heightPercent={heightPercent}
                        onClick={() =>
                          setEditTarget({ date: day.date, index: idx, session })
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {editTarget && (
        <SessionEditModal
          session={editTarget.session}
          onSave={handleSaveEdit}
          onDelete={handleDeleteEdit}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
};

export default CalendarHistory;
