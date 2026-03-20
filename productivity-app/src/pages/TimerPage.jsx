import React from 'react'
import { useNavigate } from 'react-router-dom';
import ContainerH from "../components/ui/Container/ContainerH";
import Timer from '@/components/timer/Timer';

const TimerPage = () => {
  const navigate = useNavigate();
  // default to custom timer when no mode is specified
  return (
    <ContainerH>
      <Timer mode="custom" onBack={() => navigate('/')} />
    </ContainerH>
  )
}

export default TimerPage