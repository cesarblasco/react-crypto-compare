import React from "react";
import { IChartSettings } from "../../../../../models/interfaces/ChartSettings";
import { ChartTypes } from "../../../../../models/enums/ChartTypes.enum";

interface IChartCaption {
  chartSettings: IChartSettings;
}

const ChartCaption: React.FC<IChartCaption> = ({ chartSettings }) => {
  const { StackedBar } = ChartTypes;

  const renderCurrentChartExtraCaptionText = () => {
    switch (chartSettings.currentChart) {
      case StackedBar:
        return <span>Dev note: This chart was made my me :)</span>;

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
