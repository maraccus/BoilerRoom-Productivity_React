import React from "react";
import ContainerH from "../../components/ui/ContainerH";
import Timer from "./Timer";

const TimerWrapper = () => (
  <ContainerH>
    <Timer mode="custom" onBack={() => {}} />
  </ContainerH>
);

export default TimerWrapper;
