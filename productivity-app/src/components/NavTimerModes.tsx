import React from "react";
import ContainerH from "./ContainerH";
import ContainerV from "./ContainerV";
import ModeCard from "./ModeCard";
import { TIMER_MODES } from "../timerModes";

import ClockIcon from "../assets/alarm-clock-solid-full.svg?react";
import StopwatchIcon from "../assets/stopwatch-solid-full.svg?react"; 

interface NavTimerModesProps {
  onModeSelect?: (mode: string) => void;
}

const NavTimerModes: React.FC<NavTimerModesProps> = ({ onModeSelect }) => {
  const handleCardClick = (mode: string): void => {
    onModeSelect?.(mode);
  };

  return (
    <>
      <ContainerV>
        <div className="cards-container">
          <h1>Choose a timer</h1>
        </div>
        <ContainerH>
          <ModeCard
            title={TIMER_MODES.find(m => m.id === "custom")?.label ?? "Custom Timer"}
            Icon={ClockIcon}
            onClick={() => handleCardClick("custom")}
          />
          <ModeCard
            title={TIMER_MODES.find(m => m.id === "stopwatch")?.label ?? "Stopwatch"}
            Icon={StopwatchIcon}
            onClick={() => handleCardClick("stopwatch")}
          />
          {/* only two options now */}
        </ContainerH>
      </ContainerV>
    </>
  );
};

export default NavTimerModes;
