import React from "react";
import ContainerH from "./ContainerH";
import ContainerV from "./ContainerV";
import ModeCard from "./ModeCard";

// Ikonerna
// NOTERA TIDIGA TS-VARNING:
// TypeScript-felen var bara "statiska" editor-varningar, inte runtime-fel.
// Därför varningar, men allt fungerade.
// Fixade med src/vite-env.d.ts. Går även med @ts-ignore, men dåligt långsiktigt.
import DeepWorkIcon from "../assets/ModeCard/deepwork.svg?react";
import MeetingIcon from "../assets/ModeCard/meeting.svg?react";
import BreakIcon from "../assets/ModeCard/break.svg?react";

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
          <h1>What are we tracking?</h1>
        </div>
        <ContainerH>
          <ModeCard
            title="Work"
            Icon={DeepWorkIcon}
            onClick={() => handleCardClick("deepwork")}
          />
          <ModeCard
            title="Meeting"
            Icon={MeetingIcon}
            onClick={() => handleCardClick("meeting")}
          />
          <ModeCard
            title="Break"
            Icon={BreakIcon}
            onClick={() => handleCardClick("break")}
          />
        </ContainerH>
      </ContainerV>
    </>
  );
};

export default NavTimerModes;
