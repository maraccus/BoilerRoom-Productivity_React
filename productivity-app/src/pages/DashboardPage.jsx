import React from 'react'
import { useNavigate } from 'react-router-dom'
import ContainerV from "../components/ui/Container/ContainerV";
import ContainerH from "../components/ui/Container/ContainerH";
import NavTimerModes from '@/components/timer/NavTimerModes';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleModeSelect = (mode) => {
    navigate(`/timer/${mode}`);
  };

  return (
    <ContainerV>
      <ContainerH>
        <NavTimerModes onModeSelect={handleModeSelect} />
      </ContainerH>
    </ContainerV>
  )
}

export default DashboardPage