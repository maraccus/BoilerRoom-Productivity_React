import { React, useEffect, useState } from "react";
import MainContainer from "./components/MainContainer";
import ContainerV from "./components/ContainerV";
import ContainerH from "./components/ContainerH";
import ProfileCard from "./components/ProfileCard";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import GraphWeekday from "./components/GraphWeekday";
import ModeCard from "./components/ModeCard.tsx";
import NavTimerModes from "./components/NavTimerModes.tsx";
import TimerWrapper from "./components/TimerWrapper";

import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <>
      <MainContainer>
        <Navigation />
        {/* Add main components here – lägg till kort eller timer */}
        {/* <NavTimerModes /> */}
        <NavTimerModes />
        {/* <ContainerH>
          <TimerWrapper/>
          <GraphWeekday/>
        </ContainerH> */}
        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
