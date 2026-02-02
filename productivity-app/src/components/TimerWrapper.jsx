import {React, useState} from 'react'
import TimerClock from './TimerClock'
import ButtonStd from './ButtonStd';
import ContainerV from './ContainerV';

const TimerWrapper = () => {
    const [isActive, setIsActive] = useState(false);
  return (
    <>
        <ContainerV>
            <TimerClock isActive={isActive} duration={120}/>
            <ButtonStd onClick={() => setIsActive(true)}><p>Start Timer</p></ButtonStd>
        </ContainerV>
    </>
  )
}

export default TimerWrapper