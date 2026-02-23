import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

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

import DashboardPage from "./pages/DashboardPage"
import TimerPage from "./pages/TimerPage"
import GraphPage from "./pages/GraphPage"
import CalendarPage from "./pages/CalendarPage"
import NotFoundPage from "./pages/NotFoundPage"

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

        {/* Primary app routes (from dev) */}
        <Routes>
          <Route path="/" element={<DashboardPage/>} />
          <Route path="/timer" element={<TimerPage/>} />
          <Route path="/graphs" element={<GraphPage/>} />
          <Route path="/calendar" element={<CalendarPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>

        {/* Additional UI from TomacTypeScript */}
        <NavTimerModes />
        {/* Optionally show side components:
            <ContainerH>
              <TimerWrapper />
              <GraphWeekday />
            </ContainerH>
        */}

        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
