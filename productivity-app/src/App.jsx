import React from "react";
import MainContainer from "./components/MainContainer"
import ContainerV from "./components/ContainerV";
import ContainerH from "./components/ContainerH";
import ProfileCard from "./components/ProfileCard";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import GraphWeekday from "./components/GraphWeekdayV2";
import "./App.css";

function App() {
  return (
    <>
      <MainContainer>
        <Navigation/>
        <ContainerV>
        {/*Add main components here*/}
          <ContainerH>
            <GraphWeekday/>
            <GraphWeekday/>
            <GraphWeekday/>
            <GraphWeekday/>
            <GraphWeekday/>
            <GraphWeekday/>
            <GraphWeekday/>
          </ContainerH>
        </ContainerV>
        <Footer/>
      </MainContainer>
    </>
  );
}

export default App;
