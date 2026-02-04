import React, { useState } from "react";
import ContainerH from "./ContainerH";
import ModeCard from "./ModeCard";

// Ikonerna
import DeepWorkIcon from "../assets/ModeCard/deepwork.svg?react";
import MeetingIcon from "../assets/ModeCard/meeting.svg?react";
import BreakIcon from "../assets/ModeCard/break.svg?react";
const NavTimerModes = () => {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleCardClick = (mode) => {
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
