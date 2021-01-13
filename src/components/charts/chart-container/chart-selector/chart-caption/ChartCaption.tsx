import React, { useContext } from "react";
import { ChartTypes } from "../../../../../models/enums/ChartTypes.enum";
import { ChartContext } from "../../../../../contexts/chart-context/ChartContext";

const ChartCaption: React.FC = () => {
  const { StackedBar, Bar } = ChartTypes;
  const { state } = useContext(ChartContext);

  const renderCurrentChartExtraCaptionText = () => {
    switch (state.currentChart) {
      case StackedBar:
        return <span>Dev note: This chart was made by me :)</span>;

      case Bar:
        return <span>Displays all values.</span>;

      default:
        return null;
    }
  };

  return (
    <figcaption>
      <h3 className="text-center">
        {state.currentChart !== Bar &&
          state.currentComparisonTitle}{" "}
        {state.currentChart} chart.{" "}
        <>{renderCurrentChartExtraCaptionText()}</>
      </h3>
    </figcaption>
  );
};

export default ChartCaption;
