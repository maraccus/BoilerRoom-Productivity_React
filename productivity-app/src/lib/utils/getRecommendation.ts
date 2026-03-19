import type { Session } from "../../features/timer/useTimerReducer";

export interface Recommendation {
  minutes: number;
  reason: string;
}

export function getRecommendation(
  sessions: Record<string, Session[]>,
): Recommendation {
  const allSessions = Object.values(sessions).flat();

  const focusSessions = allSessions.filter(
    (session) =>
      session.mode !== "stopwatch" &&
      typeof session.mood === "number" &&
      typeof session.duration === "number" &&
      session.duration > 0,
  );

  const recentSessions = focusSessions.slice(-5);

  if (recentSessions.length === 0) {
    return {
      minutes: 25,
      reason: "No previous data found. 25 minutes is recommended.",
    };
  }

  const avgMood =
    recentSessions.reduce((sum, session) => sum + (session.mood ?? 0), 0) /
    recentSessions.length;

  if (avgMood >= 4.5) {
    return {
      minutes: 35,
      reason: "Recent sessions are going very well. 35 minutes is recommended.",
    };
  }

  if (avgMood >= 4) {
    return {
      minutes: 30,
      reason: "Recent sessions are strong. 30 minutes is recommended.",
    };
  }

  if (avgMood >= 3) {
    return {
      minutes: 25,
      reason: "Sessions are stable. 25 minutes is recommended.",
    };
  }

  return {
    minutes: 20,
    reason: "Recent sessions seem tiring. 20 minutes is recommended.",
  };
}
