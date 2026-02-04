import {React, useEffect, useState} from 'react'
import TimerClock from './TimerClock'
import ButtonStd from './ButtonStd';
import ContainerV from './ContainerV';

const TimerWrapper = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
    document.body.classList.toggle("timer-active-bg", isActive);

    return () => {
      document.body.classList.remove("timer-active-bg");
    };
  }, [isActive]);

  return (
    <>
        <ContainerV>
            <TimerClock isActive={isActive} duration={10}/>
            <ButtonStd onClick={() => setIsActive(true)}><p>Start Timer</p></ButtonStd>
            <ButtonStd onClick={() => setIsActive(false)}><p>Stop Timer</p></ButtonStd>
        </ContainerV>
    </>
  )
}

export default TimerWrapper