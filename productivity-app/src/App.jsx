import React from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard";

function App() {
  return (
    <>
      <div className="container">
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
    </>
  );
}

export default App;
