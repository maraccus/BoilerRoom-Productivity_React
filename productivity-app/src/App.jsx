import React from "react";
import MainContainer from "./components/MainContainer"
import ProfileCard from "./components/ProfileCard";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <MainContainer>
        <Navigation/>
        {/*Add main components here*/}
        <ProfileCard/>
        <Footer/>
      </MainContainer>
    </>
  );
}

export default App;
