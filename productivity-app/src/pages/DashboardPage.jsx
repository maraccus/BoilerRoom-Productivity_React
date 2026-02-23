import React from 'react'
import ContainerV from "../components/ContainerV";
import ContainerH from "../components/ContainerH";
import NavTimerModes from "../components/NavTimerModes";

const DashboardPage = () => {
  return (
    <ContainerV>
      <ContainerH>
        <NavTimerModes />
      </ContainerH>
    </ContainerV>
  )
}

export default DashboardPage