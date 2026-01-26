import React, { useState } from "react";
import MainContainer from "./components/MainContainer";
import ProfileCard from "./components/ProfileCard";
import Navigation from "./components/Navigation";
import ModeCard from "./components/ModeCard";
import "./App.css";

// Ikonerna
import deepWorkIcon from "./assets/ModeCard/deepwork.svg";
import meetingIcon from "./assets/ModeCard/meeting.svg";
import breakIcon from "./assets/ModeCard/break.svg";

function App() {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleCardClick = (mode) => {
    setSelectedMode(mode); //Detta uppdeterar alltså state!
  };

  return (
    <>
      <MainContainer>
        <Navigation />
        {/* Add main components here – lägg till kort eller timer */}
        {selectedMode ? (
          <Timer mode={selectedMode} onBack={() => setSelectedMode(null)} />
        ) : (
          <div className="cards-container">
            {" "}
            {/* Lägg till CSS i App.css för flex-layout */}
            <h1>Välj ett läge</h1>
            <ModeCard
              title="Deep Work"
              icon={deepWorkIcon}
              onClick={() => handleCardClick("deepwork")}
            />
            <ModeCard
              title="Möte"
              icon={meetingIcon}
              onClick={() => handleCardClick("meeting")}
            />
            <ModeCard
              title="Paus"
              icon={breakIcon}
              onClick={() => handleCardClick("break")}
            />
          </div>
        )}
      </MainContainer>
    </>
  );
}

export default App;
