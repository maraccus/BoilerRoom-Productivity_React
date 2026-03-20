import React from 'react'
import CalendarHistory from '@/components/ui/Calender/CalendarHistory';
import ContainerV from '@/components/ui/Container/ContainerV';

const CalendarPage = () => {
  return (
    <ContainerV>
      <h1>Weekly Session History</h1>
      <CalendarHistory />
    </ContainerV>
  )
}

export default CalendarPage