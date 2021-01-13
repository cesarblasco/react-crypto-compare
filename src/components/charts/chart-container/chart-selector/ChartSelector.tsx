import React, { useContext } from "react";
import StackedBarChart from "./stacked-bar-chart/StackedBarChart";
import PieChart from "./pie-chart/PieChart";
import BarChart from "./bar-chart/BarChart";
import { ChartTypes } from "../../../../models/enums/ChartTypes.enum";
import { ChartContext } from "../../../../contexts/chart-context/ChartContext";

const ChartSelector: React.FC = () => {
  const { StackedBar, Pie, Bar } = ChartTypes;
  const { state } = useContext(ChartContext);

  const renderCurrentChart = () => {
    switch (state.currentChart) {
      case StackedBar:
        return (
          <StackedBarChart />
        );

      case Pie:
        return (
          <PieChart />
        );

      case Bar:
        return (
          <BarChart />
        );
    }
  };

  return <>{renderCurrentChart()}</>;
};

export default ChartSelector;
