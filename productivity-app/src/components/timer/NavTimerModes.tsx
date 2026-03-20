import React from "react";
import ContainerH from "../ui/Container/ContainerH";
import ContainerV from "../ui/Container/ContainerV";
import ModeCard from "../mood/ModeCard";
import { TIMER_MODES } from "@/constants/timerModes";

import ClockIcon from "@/assets/icons/alarm-clock-solid-full.svg?react";
import StopwatchIcon from "@/assets/icons/stopwatch-solid-full.svg?react";
import RobotIcon from "@/assets/icons/robot-solid-full.svg?react";

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
          Icon={RobotIcon}
          onClick={() => handleCardClick("recommendation")}
          />
          {/* only two options now */}
        </ContainerH>
      </ContainerV>
    </>
  );
};

export default NavTimerModes;
