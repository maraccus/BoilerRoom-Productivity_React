import React from "react";
import ContainerH from "./ContainerH";
import ContainerV from "./ContainerV";
import ModeCard from "./ModeCard";
import { TIMER_MODES } from "../timerModes";

import ClockIcon from "../assets/alarm-clock-solid-full.svg?react";
import StopwatchIcon from "../assets/stopwatch-solid-full.svg?react"; 
import ChartIcon from "../assets/chart-line-solid-full.svg?react";

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
          <h1>How are we tracking time today?</h1>
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
          <ModeCard
          title={TIMER_MODES.find(m => m.id === "recommendation")?.label ?? "Recommendation"}
          Icon={ChartIcon}
          onClick={() => handleCardClick("recommendation")}
          />
          {/* only two options now */}
        </ContainerH>
      </ContainerV>
    </>
  );
};

export default NavTimerModes;
