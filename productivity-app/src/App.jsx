import React from "react";
import MainContainer from "./components/MainContainer";
import ContainerV from "./components/ContainerV";
import ContainerH from "./components/ContainerH";
import ProfileCard from "./components/ProfileCard";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import GraphWeekday from "./components/GraphWeekday";
import ModeCard from "./components/ModeCard";
import NavTimerModes from "./components/NavTimerModes";
import TimerWrapper from "./components/TimerWrapper";

import "./App.css";

function App() {
  return (
    <>
      <MainContainer>
        <Navigation />
        {/* Add main components here – lägg till kort eller timer */}
        <NavTimerModes />
        <ContainerH>
          <TimerWrapper />
          <GraphWeekday />
        </ContainerH>
        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
