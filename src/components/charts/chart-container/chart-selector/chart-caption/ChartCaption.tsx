import React from "react";
import { IChartSettings } from "../../../../../models/interfaces/ChartSettings";
import { ChartTypes } from "../../../../../models/enums/ChartTypes.enum";

interface IChartCaption {
  chartSettings: IChartSettings;
}

const ChartCaption: React.FC<IChartCaption> = ({ chartSettings }) => {
  const { StackedBar, Bar } = ChartTypes;

  const renderCurrentChartExtraCaptionText = () => {
    switch (chartSettings.currentChart) {
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
        {chartSettings.currentChart !== Bar &&
          chartSettings.currentComparisonTitle}{" "}
        {chartSettings.currentChart} chart.{" "}
        <>{renderCurrentChartExtraCaptionText()}</>
      </h3>
    </figcaption>
  );
};

export default ChartCaption;
