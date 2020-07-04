import React from "react";
import { IChartSettings } from "../../../../../models/interfaces/ChartSettings";
import { ChartTypes } from "../../../../../models/enums/ChartTypes.enum";

interface IChartCaption {
  chartSettings: IChartSettings;
}

const ChartCaption: React.FC<IChartCaption> = ({ chartSettings }) => {
  const { Pie, Bar } = ChartTypes;

  const renderCurrentChartExtraCaptionText = () => {
    switch (chartSettings.currentChart) {
      case Pie:
        return chartSettings.currentComparisonKey !== "priceUsd" ? (
          <span>Values expressed in billions USD.</span>
        ) : null;

      case Bar:
        return (
          <span>
            Displays all values (except price) for each asset (in billions USD)
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <figcaption>
      <h3 className="text-center">
        {chartSettings.currentComparisonTitle} {chartSettings.currentChart}{" "}
        chart. <>{renderCurrentChartExtraCaptionText()}</>
      </h3>
    </figcaption>
  );
};

export default ChartCaption;
