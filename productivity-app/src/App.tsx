import { useEffect, useState } from "react";
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

import { MoodProvider } from "./contexts/MoodContext";
import { MoodValue } from "./hooks/useMoodForm";

import "./App.css";

function App() {
  const [theme] = useState("dark");

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const handleMoodSelected = (mood: MoodValue) => {
    // ----------------------------------------------------------------
    //          TILLFÄLLIG PLATS – VÄNTAR PÅ RIKTIG IMPLEMENTATION
    // ----------------------------------------------------------------
    // När vi kopplar ihop med:
    //   • backend API
    //   • global state (Zustand/Redux/Context)
    //   • toast-notifikationer
    //   • event-spårning
    // så ska all logik flyttas hit eller till en dedikerad hook/funktion
    //
    // Exempel på hur det kan se ut senare:
    //
    // try {
    //   await moodService.log({ mood, timestamp: new Date() });
    //   toast.success("Humör sparat!");
    //   trackEvent("mood_logged", { value: mood });
    // } catch (err) {
    //   toast.error("Kunde inte spara humör");
    //   reportError(err);
    // }
    //
    // console.log("Humör loggat:", mood); // ← borttagen
  };

  return (
    <>
      <MainContainer>
        <Navigation />

        <MoodProvider onMoodSelected={handleMoodSelected}>
          {/* Tillfällig test-visning av MoodCheck */}
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <MoodCheck />
          </div>

          {/* Kommenterade routes – aktivera när du är klar med test */}
          {/* <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/graphs" element={<GraphPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes> */}
        </MoodProvider>

        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
