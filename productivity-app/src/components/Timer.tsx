import React, { useEffect, useState } from "react";
import TimerClock from "./TimerClock";
import ButtonStd from "./ButtonStd";
import ButtonStdRed from "./ButtonStdRed";
import ContainerV from "./ContainerV";
import ContainerH from "./ContainerH";
import MoodLogForm from "./MoodLogForm";
import type { Session } from "../hooks/useTimerReducer";
import { useTimer } from "../TimerContext";
import { getTimerModeLabel, type TimerMode } from "../timerModes";
import type { MoodValue, CategoryValue } from "../hooks/useMoodForm";
import styles from "./Timer.module.css";

interface TimerProps {
  mode: TimerMode;
  onBack: () => void;
}

const Timer: React.FC<TimerProps> = ({ mode, onBack }) => {
  const { state, actions } = useTimer();

  const [minutesInput, setMinutesInput] = useState("");
  const [warning, setWarning] = useState("");
  const [pendingSession, setPendingSession] = useState<Session | null>(null);

  const isCustom = mode === "custom";
  const isStopwatch = mode === "stopwatch";

  const inputDurationSeconds = (parseInt(minutesInput, 10) || 0) * 60;

  const durationSeconds = isCustom
    ? state.isActive
      ? state.durationSeconds
      : inputDurationSeconds
    : 25 * 60;

  useEffect(() => {
    document.body.classList.toggle(
      "timer-active-bg",
      state.isActive && !state.isPaused,
    );
    return () => document.body.classList.remove("timer-active-bg");
  }, [state.isActive, state.isPaused]);

  useEffect(() => {
    if (isCustom && state.durationSeconds > 0 && minutesInput === "") {
      setMinutesInput(String(state.durationSeconds / 60));
    }
  }, [isCustom, state.durationSeconds, minutesInput]);

  const handleStartPause = () => {
    if (!state.isActive) {
      if (isCustom && inputDurationSeconds <= 0) {
        setWarning("Add time for how long you want to work.");
        return;
      }

      setWarning("");
      actions.start(mode, inputDurationSeconds);
    } else {
      actions.togglePause();
    }
  };

  const handleStop = () => {
    if (!state.startTime) return;

    const endTime = new Date();
    const session: Session = {
      mode,
      start: state.startTime.toTimeString().slice(0, 8),
      end: endTime.toTimeString().slice(0, 8),
      duration: Math.floor(
        (endTime.getTime() - state.startTime.getTime()) / 1000,
      ),
    };

    actions.stop();
    setPendingSession(session);
  };

  const handleMoodSubmit = ({
    mood,
    category,
  }: {
    mood: MoodValue;
    category: CategoryValue;
  }) => {
    if (!pendingSession) return;
    actions.logSession({ ...pendingSession, mood, category });
    setPendingSession(null);
  };

  const handleMoodCancel = () => setPendingSession(null);

  const handleBack = () => {
    if (state.isActive) actions.stop();
    onBack();
  };

  if (pendingSession) {
    return (
      <ContainerV>
        <h2>Logga tidsperiod</h2>
        <MoodLogForm onSubmit={handleMoodSubmit} onCancel={handleMoodCancel} />
        <ButtonStd onClick={handleBack}>
          <p>Back to Modes</p>
        </ButtonStd>
      </ContainerV>
    );
  }

  return (
    <ContainerV>
      <h2>{getTimerModeLabel(mode)}</h2>

      {isCustom && (
        <div className={styles.containerInput}>
          <label className={styles.inputLabel}>
            Set minutes:
            <input
              className={styles.timeInput}
              type="number"
              min="0"
              value={minutesInput}
              disabled={state.isActive}
              onChange={(e) => {
                setMinutesInput(e.target.value);
                setWarning("");
              }}
              autoFocus
            />
          </label>

          {warning && <p className={styles.warningText}>{warning}</p>}
        </div>
      )}

      <ContainerV>
        <TimerClock
          key={`${mode}-${durationSeconds}-${state.startTime?.getTime() ?? "idle"}`}
          isActive={state.isActive}
          isPaused={state.isPaused}
          duration={isStopwatch ? 0 : durationSeconds}
          variant={isStopwatch ? "stopwatch" : "timer"}
          startTime={state.startTime ?? undefined}
          onTimerComplete={handleStop}
        />

        <ContainerH>
          <ButtonStd onClick={handleStartPause}>
            <p>
              {!state.isActive
                ? "Start Timer"
                : state.isPaused
                  ? "Resume Timer"
                  : "Pause Timer"}
            </p>
          </ButtonStd>

          {state.isActive && (
            <ButtonStdRed onClick={handleStop}>
              <p>Stop & Log</p>
            </ButtonStdRed>
          )}

          <ButtonStd onClick={handleBack}>
            <p>Back to Modes</p>
          </ButtonStd>
        </ContainerH>
      </ContainerV>
    </ContainerV>
  );
};

export default Timer;