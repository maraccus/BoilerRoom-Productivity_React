import React from "react";
import ContainerH from "./ContainerH";
import ContainerV from "./ContainerV";
import ModeCard from "./ModeCard";

// Ikonerna
// NOTERA TIDIGA TS-VARNING:
// TypeScript-felen var bara "statiska" editor-varningar, inte runtime-fel.
// Därför varningar, men allt fungerade.
// Fixade med src/vite-env.d.ts. Går även med @ts-ignore, men dåligt långsiktigt.
import ClockIcon from "../assets/ModeCard/clock.svg?react"; // generic timer icon
import StopwatchIcon from "../assets/ModeCard/stopwatch.svg?react"; // stopwatch for meetings

// Här definieras en typ för props till NavTimerModes
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
            title="Custom Timer"
            Icon={ClockIcon}
            onClick={() => handleCardClick("custom")}
          />
          <ModeCard
            title="Stopwatch"
            Icon={StopwatchIcon}
            onClick={() => handleCardClick("meeting")}
          />
          {/* only two options now */}
        </ContainerH>
      </ContainerV>
    </>
  );
};

export default NavTimerModes;
