import React from 'react'
import ContainerV from "../components/ContainerV";
import BarChart from "../components/BarChart"
import Rechart from "../components/Rechart"

const GraphPage = () => {
  return (
    <>
      <ContainerV>
      <h1>Graphs</h1>
        <Rechart />
      </ContainerV>
    </>
  )
}

export default GraphPage