import React from 'react'
import CalendarHistory from '../components/CalendarHistory';
import ContainerV from '@/components/ContainerV';

const CalendarPage = () => {
  return (
    <ContainerV>
      <h1>Weekly Session History</h1>
      <CalendarHistory />
    </ContainerV>
  )
}

export default CalendarPage