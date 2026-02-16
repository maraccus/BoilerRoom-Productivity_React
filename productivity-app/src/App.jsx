import {React, useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";


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
    <Routes>
      <Route path="/" element={<DashboardPage/>} />
      <Route path="/timer" element={<TimerPage/>} />
      <Route path="/graphs" element={<GraphPage/>} />
      <Route path="/calendar" element={<CalendarPage/>} />
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  );
}

export default App;
