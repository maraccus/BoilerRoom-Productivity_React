import React from 'react'
import ContainerV from "../components/ContainerV";
import BarChart from "../components/BarChart"

const GraphPage = () => {
  return (
    <>
      <h1>Graphs Page</h1>
      <ContainerV>
        <BarChart />
      </ContainerV>
    </>
  )
}

export default GraphPage