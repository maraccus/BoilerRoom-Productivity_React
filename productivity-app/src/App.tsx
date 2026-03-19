import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import MainContainer from "./components/ui/MainContainer";
import Navigation from "./components/Navigation";
import Footer from "./components/ui/Footer";
import { TimerProvider } from "./features/timer/TimerContext";

import DashboardPage from "./pages/DashboardPage";
import TimerPage from "./features/timer/TimerPage";
import TimerModePage from "./features/timer/TimerModePage";
import GraphPage from "./pages/GraphPage";
import CalendarPage from "./pages/CalendarPage";
import NotFoundPage from "./pages/NotFoundPage";
import { WorkDaySettingsProvider } from "./WorkDaySettingsContext";

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
        <TimerProvider>
          <WorkDaySettingsProvider>
            <Navigation />

            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/timer/:mode" element={<TimerModePage />} />
                <Route path="/timer" element={<TimerPage />} />
                <Route path="/graphs" element={<GraphPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>

            <Footer />
          </WorkDaySettingsProvider>
        </TimerProvider>
      </MainContainer>
    </>
  );
}

export default App;
