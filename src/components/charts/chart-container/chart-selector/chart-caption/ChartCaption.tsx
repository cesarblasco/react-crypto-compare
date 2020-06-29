import React from "react";
import { IChartSettings } from "../../../../../models/interfaces/ChartSettings";
import { ChartTypes } from "../../../../../models/enums/ChartTypes.enum";

interface IChartCaption {
  chartSettings: IChartSettings;
}

const ChartCaption: React.FC<IChartCaption> = ({ chartSettings }) => {
  const { Pie } = ChartTypes;
  return (
    <figcaption>
      <h3 className="text-center">
        {chartSettings.currentComparisonTitle} {chartSettings.currentChart}{" "}
        chart.{" "}
        {chartSettings.currentComparisonKey !== "priceUsd" &&
          chartSettings.currentChart === Pie && (
            <span>Values expressed in billions USD.</span>
          )}
      </h3>
    </figcaption>
  );
};

export default ChartCaption;
