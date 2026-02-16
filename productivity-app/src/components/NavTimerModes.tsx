import React, { useState } from "react";
import ContainerH from "./ContainerH";
import ModeCard from "./ModeCard";

// Ikonerna
// NOTERA TIDIGA TS-VARNING:
// TypeScript-felen var bara "statiska" editor-varningar, inte runtime-fel.
// Därför varningar, men allt fungerade.
// Fixade med src/vite-env.d.ts. Går även med @ts-ignore, men dåligt långsiktigt.
import DeepWorkIcon from "../assets/ModeCard/deepwork.svg?react";
import MeetingIcon from "../assets/ModeCard/meeting.svg?react";
import BreakIcon from "../assets/ModeCard/break.svg?react";

// Här definieras en typ för props till ModeCard
// NOTERA: Icon: React.FC eftersom vi importerar SVG med ?react
// → vite-plugin-svgr gör den till en riktig React-komponent
// → kan användas som <Icon className="..." fill="..." />
// → React.FC ger rätt typ + bra autocomplete för SVG-props
interface ModeCardProps {
  title: string;
  Icon: React.FC; // ← berättar för TS att det är en komponent som kan renderas.
  onClick: () => void;
}
const NavTimerModes: React.FC = () => {
  // Från vanlig state till union types. Tvingar null-fall hanteras senare. Annars hade klassiska runtime-fel uppstått, nu får vi varningar direkt i editorn i stället.
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  // Funktionen tar BARA emot string nu. TS Säger ifrån om exempelvis number skickas.
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
