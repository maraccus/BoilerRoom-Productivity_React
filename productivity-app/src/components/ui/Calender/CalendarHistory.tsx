/**
 * Kalenderhistorikkomponent: visar veckovisa sessions och redigering.
 * @module CalendarHistory
 */
import React, { useMemo, useState } from "react";
import { useTimer } from "@/contexts/TimerContext";
import type { Session } from "@/hooks/useTimerReducer";
import { formatDuration } from "@/utils/timeUtils";
import { useWorkDaySettings } from "@/contexts/WorkDaySettingsContext";
import SessionBlock from "@/components/ui/Session/SessionBlock";
import SessionEditModal from "../Session/SessionEditModal";
import styles from "./CalendarHistory.module.css";

import LeftIcon from "@/assets/icons/arrow-left-solid-full.svg?react";
import RightIcon from "@/assets/icons/arrow-right-solid-full.svg?react";

/**
 * Konverterar ett Date-objekt till lokal yyyy-mm-dd-sträng.
 * @param {Date} d
 * @returns {string}
 */
const toLocalDateString = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/**
 * Skapar listan av dagar i veckan utifrån offset.
 * @param {number} [weekOffset=0] - 0=denna vecka, -1=föregående, +1=nästa.
 * @returns {{date:string,jsDay:number}[]}
 */
const getWeekDays = (weekOffset = 0) => {
  const today = new Date();
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7) + weekOffset * 7);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { date: toLocalDateString(d), jsDay: d.getDay() };
  });
};

/**
 * Skapar text för daghuvud.
 * @param {string} dateStr - Datumsträng i format yyyy-mm-dd.
 * @returns {{weekday:string,sub:string}}
 */
const prettyHeader = (dateStr: string) => {
  const d = new Date(`${dateStr}T00:00:00`);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
    sub: d.toLocaleDateString("en-US", { month: "long", day: "numeric" }),
  };
};

/**
 * Skapar etikett för veckointervall.
 * @param {{date:string,jsDay:number}[]} weekDays
 * @returns {string}
 */
const getWeekRangeLabel = (weekDays: { date: string; jsDay: number }[]) => {
  if (weekDays.length === 0) return "";

  const first = new Date(`${weekDays[0].date}T00:00:00`);
  const last = new Date(`${weekDays[6].date}T00:00:00`);

  const firstMonth = first.toLocaleDateString("en-US", { month: "short" });
  const lastMonth = last.toLocaleDateString("en-US", { month: "short" });

  if (firstMonth === lastMonth) {
    return `${firstMonth} ${first.getDate()}–${last.getDate()}`;
  }

  return `${firstMonth} ${first.getDate()} – ${lastMonth} ${last.getDate()}`;
};

/**
 * Konverterar tidsträng "HH:MM:SS"/"HH:MM" till decimaltimmar.
 * @param {string} t
 * @returns {number}
 * @example
 * timeStringToFractional('08:30') // 8.5
 */
const timeStringToFractional = (t: string): number => {
  const [h, m, s = 0] = t.split(":").map(Number);
  return h + m / 60 + s / 3600;
};

/**
 * Beräknar position i visualiseringsvy för sessionblock.
 * @param {string} start Starttid i format "HH:MM".
 * @param {string} end Sluttid i format "HH:MM".
 * @param {number} windowStart Starttid i decimaltimmar (t.ex. 8).
 * @param {number} windowEnd Sluttid i decimaltimmar (t.ex. 18).
 * @returns {{topPercent:number,heightPercent:number}}
 */
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

/**
 * Kalenderhistorik för vecka med editable sessions.
 * @component
 * @returns {JSX.Element}
 */
const CalendarHistory: React.FC = () => {
  const { state, actions } = useTimer();
  const { settings } = useWorkDaySettings();
  const { startHour, endHour } = settings;

  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  const weekDays = useMemo(() => getWeekDays(weekOffset), [weekOffset]);

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
      <div className={styles.weekNav}>
        <button
          className={styles.weekNavButton}
          onClick={() => setWeekOffset((prev) => prev - 1)}
        >
          <LeftIcon className={styles.icn} />
        </button>

        <h2 className={styles.weekLabel}>{getWeekRangeLabel(weekDays)}</h2>

        <button
          className={`${styles.weekNavButton} ${
            weekOffset === 0 ? styles.hiddenNavButton : ""
          }`}
          onClick={() => setWeekOffset((prev) => prev + 1)}
          disabled={weekOffset === 0}
          aria-hidden={weekOffset === 0}
        >
          <RightIcon className={styles.icn} />
        </button>
        <button
          className={`${styles.todayButton} ${
            weekOffset === 0 ? styles.hiddenTodayButton : ""
          }`}
          onClick={() => setWeekOffset(0)}
          disabled={weekOffset === 0}
        >
          This week
        </button>
      </div>

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
