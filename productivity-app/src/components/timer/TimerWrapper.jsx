import React from 'react';
import ContainerH from '../ui/Container/ContainerH';
import Timer from './Timer';

const TimerWrapper = () => (
  <ContainerH>
    <Timer mode="custom" onBack={() => {}} />
  </ContainerH>
);

export default TimerWrapper
