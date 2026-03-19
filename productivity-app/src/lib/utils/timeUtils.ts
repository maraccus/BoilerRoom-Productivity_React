export const MINUTES_PER_DAY = 24 * 60;

export function timeStringToMinutes(time: string): number {
  const [hoursStr, minutesStr, secondsStr = "0"] = time.split(":");
  const hours = Number(hoursStr) || 0;
  const minutes = Number(minutesStr) || 0;
  const seconds = Number(secondsStr) || 0;

  const totalMinutes = hours * 60 + minutes + seconds / 60;
  return Math.max(0, Math.min(MINUTES_PER_DAY, totalMinutes));
}

export function getBlockPosition(
  start: string,
  end: string,
): { leftPercent: number; widthPercent: number } {
  const startMinutes = timeStringToMinutes(start);
  const endMinutes = timeStringToMinutes(end);

  const effectiveEndMinutes = endMinutes < startMinutes ? MINUTES_PER_DAY : endMinutes;

  const clampedEnd = Math.max(startMinutes, Math.min(MINUTES_PER_DAY, effectiveEndMinutes));
  const durationMinutes = Math.max(0, clampedEnd - startMinutes);

  const leftPercent = (startMinutes / MINUTES_PER_DAY) * 100;
  const widthPercent = (durationMinutes / MINUTES_PER_DAY) * 100;

  return { leftPercent, widthPercent };
}

export function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "0m";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  return `${minutes}m`;
}
