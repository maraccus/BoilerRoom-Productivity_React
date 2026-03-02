// legacy wrapper kept for compatibility but now delegates to the new Timer component
import React from 'react';
import ContainerH from './ContainerH';
import Timer from './Timer';

const TimerWrapper = () => (
  <ContainerH>
    <Timer mode="custom" onBack={() => {}} />
  </ContainerH>
);

export default TimerWrapper
