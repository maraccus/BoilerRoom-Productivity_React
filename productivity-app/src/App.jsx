import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import MainContainer from "./components/MainContainer";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import DashboardPage from "./pages/DashboardPage"
import TimerPage from "./pages/TimerPage"
import TimerModePage from "./pages/TimerModePage"
import GraphPage from "./pages/GraphPage"
import CalendarPage from "./pages/CalendarPage"
import NotFoundPage from "./pages/NotFoundPage"

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

        {/* Primary app routes (from dev) */}
        <Routes>
          <Route path="/" element={<DashboardPage/>} />
          <Route path="/timer/:mode" element={<TimerModePage/>} />
          <Route path="/timer" element={<TimerPage/>} />
          <Route path="/graphs" element={<GraphPage/>} />
          <Route path="/calendar" element={<CalendarPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>

        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
