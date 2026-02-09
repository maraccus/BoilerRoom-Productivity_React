import React, { useState } from "react";
import ContainerH from "./ContainerH";
import ModeCard from "./ModeCard";

// Ikonerna
import DeepWorkIcon from "../assets/ModeCard/deepwork.svg?react";
import MeetingIcon from "../assets/ModeCard/meeting.svg?react";
import BreakIcon from "../assets/ModeCard/break.svg?react";

// Här definieras en typ för props till ModeCard
interface ModeCardProps {
  title: string;
  Icon: React.FC;
  onClick: () => void;
}
const NavTimerModes: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleCardClick = (mode: string): void => {
    setSelectedMode(mode); //Detta uppdaterar alltså state!
  };

  return (
    <>
      {selectedMode ? (
        <Timer mode={selectedMode} onBack={() => setSelectedMode(null)} />
      ) : (
        <div className="cards-container">
          <h1>What are we tracking?</h1>
        </div>
      )}
      {/*Add main components here*/}
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
    </>
  );
};

export default NavTimerModes;
