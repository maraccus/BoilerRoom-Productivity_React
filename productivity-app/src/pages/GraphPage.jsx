import React from 'react'
import ContainerV from "../components/ui/Container/ContainerV";
import BarChart from "../components/charts/BarChart"
import Rechart from "../components/charts/Rechart"

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