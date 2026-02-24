import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import MainContainer from "./components/MainContainer";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import DashboardPage from "./pages/DashboardPage";
import TimerPage from "./pages/TimerPage";
import GraphPage from "./pages/GraphPage";
import CalendarPage from "./pages/CalendarPage";
import NotFoundPage from "./pages/NotFoundPage";
import MoodCheck from "./components/MoodCheck";

import "./App.css";

function App() {
  const [theme] = useState("dark");

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <>
      <MainContainer>
        <Navigation />

        {/* TOMAC: Jag kommenterar ut allt för att kunna se MoodChecker. */}
        {/* Primary app routes (from dev) */}
        {/* <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/graphs" element={<GraphPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes> */}
        {/* NOTERA! Detta är en TILLFÄLLIG Test bara för att se hur det ser ut. Routing kommer sedan. */}
        <div>
          <MoodCheck onMoodSelected={(mood) => console.log("Humör:", mood)} />
        </div>

        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
