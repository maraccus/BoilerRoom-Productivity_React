import React from 'react'
import MainContainer from "../components/MainContainer";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import BarChart from "../components/BarChart"

const GraphPage = () => {
  return (
    <MainContainer>
        <Navigation/>
        <div style={{ width: "100%", flex: 1, minHeight: 0, display: "flex", flexDirection: "column", padding: "2rem" }}>
          <h1>Graphs Page</h1>
          <div style={{ flex: 1, minHeight: 0, width: "100%" }}>
            <BarChart/>
          </div>
        </div>
        <Footer/>
    </MainContainer>
  )
}

export default GraphPage