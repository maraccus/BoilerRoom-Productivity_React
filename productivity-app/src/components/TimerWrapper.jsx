import { React, useEffect, useState } from "react";
import TimerClock from "./TimerClock";
import ButtonStd from "./ButtonStd";
import ContainerV from "./ContainerV";
import MoodScale from "./MoodScale";

const TimerWrapper = () => {
  const [isActive, setIsActive] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [mood, setMood] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("timer-active-bg", isActive);

    return () => {
      document.body.classList.remove("timer-active-bg");
    };
  }, [isActive]);

  const handleStartPause = () => {
    // If we press start after an ended session, reset that ended state
    if (hasEnded && !isActive) {
      setHasEnded(false);
      setElapsedSeconds(0);
      setMood(null);
    }
    setIsActive((prev) => !prev);
  };

  const handleEndLog = () => {
    setIsActive(false);
    setHasEnded(true);
    console.log("Session logged (seconds):", elapsedSeconds);
  };

  return (
    <>
      <ContainerV>
        <TimerClock
          isActive={isActive}
          duration={10}
          ended={hasEnded}
          onElapsedChange={(seconds) => setElapsedSeconds(seconds)}
          endedContent={
            hasEnded ? (
              <MoodScale value={mood} onChange={setMood} />
            ) : null
          }
        />
        {/*  Start/Pause knapp */}
        <ButtonStd onClick={handleStartPause}>
          <p>{isActive ? "Pause Timer" : "Start Timer"}</p>
        </ButtonStd>

        {/*  End/log knapp - visible while timer is running */}
        {isActive && !hasEnded && (
          <ButtonStd onClick={handleEndLog}>
            <p>End / Log</p>
          </ButtonStd>
        )}
      </ContainerV>
    </>
  );
};

export default TimerWrapper;
