import React from 'react'
import MainContainer from "../components/MainContainer";
import ContainerV from "../components/ContainerV";
import ContainerH from "../components/ContainerH";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const CalendarPage = () => {
  return (
    <MainContainer>
        <Navigation/>
        <h1>Calendar Page</h1>
        <Footer/>
    </MainContainer>
  )
}

export default CalendarPage