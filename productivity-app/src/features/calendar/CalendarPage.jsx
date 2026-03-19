import React from "react";
import CalendarHistory from "./CalendarHistory";
import ContainerV from "@/components/ui/ContainerV";

const CalendarPage = () => {
  return (
    <ContainerV>
      <h1>Weekly Session History</h1>
      <CalendarHistory />
    </ContainerV>
  );
};

export default CalendarPage;
