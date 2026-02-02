import React, { useState } from "react";
import MainContainer from "./components/MainContainer";
import React from "react";
import MainContainer from "./components/MainContainer"
import ContainerV from "./components/ContainerV";
import ContainerH from "./components/ContainerH";
import ProfileCard from "./components/ProfileCard";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import GraphWeekday from "./components/GraphWeekday";
import ModeCard from "./components/ModeCard";

import "./App.css";

// Ikonerna
import DeepWorkIcon from "./assets/ModeCard/deepwork.svg?react";
import MeetingIcon from "./assets/ModeCard/meeting.svg?react";
import BreakIcon from "./assets/ModeCard/break.svg?react";

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
          </div>
        )}
        {/*Add main components here*/}
        <ContainerH>
          <ModeCard
            title="Deep Work"
            Icon={DeepWorkIcon}
            onClick={() => handleCardClick("deepwork")}
          />
          <ModeCard
            title="Möte"
            Icon={MeetingIcon}
            onClick={() => handleCardClick("meeting")}
          />
          <ModeCard
            title="Paus"
            Icon={BreakIcon}
            onClick={() => handleCardClick("break")}
          />
        </ContainerH>
        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
