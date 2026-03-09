import React from 'react'
import ContainerV from "../components/ContainerV";
import BarChart from "../components/BarChart"
import Rechart from "../components/Rechart"

const GraphPage = () => {
  return (
    <>
      <h1>Graphs Page</h1>
      <ContainerV>
        <Rechart />
      </ContainerV>
    </>
  )
}

export default GraphPage