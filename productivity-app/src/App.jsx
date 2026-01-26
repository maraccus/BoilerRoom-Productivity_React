import React from "react";
import MainContainer from "./components/MainContainer"
import ContainerH from "./components/ContainerH";
import ProfileCard from "./components/ProfileCard";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import GraphWeekday from "./components/GraphWeekday";
import "./App.css";

function App() {
  return (
    <>
      <MainContainer>
        <Navigation/>
        {/*Add main components here*/}
        <ContainerH>
          <ProfileCard/>
          <ProfileCard/>
          <ProfileCard/>
        </ContainerH>
        <Footer/>
      </MainContainer>
    </>
  );
}

export default App;
