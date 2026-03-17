export type TimerMode = 'custom' | 'stopwatch' | "recommendation";

export interface TimerModeConfig {
  id: TimerMode;
  label: string;
}

export const TIMER_MODES: TimerModeConfig[] = [
  { id: 'custom', label: 'Custom Timer' },
  { id: 'stopwatch', label: 'Stopwatch' },
  { id: 'recommendation', label: 'Recommendation' },
];

export const isValidTimerMode = (mode: string | undefined): mode is TimerMode =>
  !!mode && TIMER_MODES.some(m => m.id === mode);

export const getTimerModeLabel = (mode: TimerMode): string =>
  TIMER_MODES.find(m => m.id === mode)?.label ?? mode;

