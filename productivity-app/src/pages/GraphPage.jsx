import React from 'react'
import MainContainer from "../components/MainContainer";
import ContainerV from "../components/ContainerV";
import ContainerH from "../components/ContainerH";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import BarChart from "../components/BarChart"

const GraphPage = () => {
  return (
    <MainContainer>
        <Navigation/>
        <h1>Graphs Page</h1>
        <ContainerV>
        <BarChart/>

        </ContainerV>
        <Footer/>
    </MainContainer>
  )
}

export default GraphPage