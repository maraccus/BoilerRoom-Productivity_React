import React from "react";
import ContainerV from "../../components/ui/ContainerV";
import BarChart from "./BarChart";
import Rechart from "./Rechart";

const GraphPage = () => {
  return (
    <>
      <ContainerV>
        <h1>Graphs</h1>
        <Rechart />
      </ContainerV>
    </>
  );
};

export default GraphPage;
