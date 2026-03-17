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
import { getRecommendation } from "../utils/getRecommendation";
import styles from "./Timer.module.css";

interface TimerProps {
  mode: TimerMode;
  onBack: () => void;
}

const Timer: React.FC<TimerProps> = ({ mode, onBack }) => {
  const { state, actions } = useTimer();

  const [minutesInput, setMinutesInput] = useState("0");
  const [warning, setWarning] = useState("");
  const [pendingSession, setPendingSession] = useState<Session | null>(null);

  const isCustom = mode === "custom";
  const isRecommendation = mode === "recommendation";
  const isStopwatch = mode === "stopwatch";
  const isTimerMode = isCustom || isRecommendation;

  const recommendation = getRecommendation(state.sessions);

  const inputDurationSeconds = (parseInt(minutesInput, 10) || 0) * 60;

  const durationSeconds = isTimerMode
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
    if (state.isActive) return;

    if (mode === "custom") {
      setMinutesInput("0");
      setWarning("");
      return;
    }

    if (mode === "recommendation") {
      setMinutesInput(String(recommendation.minutes));
      setWarning("");
      return;
    }

    if (mode === "stopwatch") {
      setMinutesInput("0");
      setWarning("");
    }
  }, [mode, recommendation.minutes, state.isActive]);

  const handleStartPause = () => {
    if (!state.isActive) {
      if (isTimerMode && inputDurationSeconds <= 0) {
        setWarning("Add time for how long you want to work.");
        return;
      }

      setWarning("");

      actions.start(
        isRecommendation ? "custom" : mode,
        isStopwatch ? 0 : inputDurationSeconds,
      );
    } else {
      actions.togglePause();
    }
  };

  const handleStop = () => {
    if (!state.startTime) return;

    const endTime = new Date();

    const session: Session = {
      mode: isRecommendation ? "recommendation" : mode,
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
        {/* <h1>Log Session</h1> */}
        <MoodLogForm onSubmit={handleMoodSubmit} onCancel={handleMoodCancel} />
        {/* <ButtonStd onClick={handleBack}>
          <p>Back to Modes</p>
        </ButtonStd> */}
      </ContainerV>
    );
  }

  return (
    <ContainerV>
      <h2>
        {isRecommendation ? "Recommended Timer" : getTimerModeLabel(mode)}
      </h2>

      {isTimerMode && (
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

          {isRecommendation && !state.isActive && (
            <p>{recommendation.reason}</p>
          )}

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