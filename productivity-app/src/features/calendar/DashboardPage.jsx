import React from "react";
import { useNavigate } from "react-router-dom";
import ContainerV from "../../components/ui/ContainerV";
import ContainerH from "../../components/ui/ContainerH";
import NavTimerModes from "../components/NavTimerModes";

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
  );
};

export default DashboardPage;
