import React from "react";
import StackedBarChart from "./stacked-bar-chart/StackedBarChart";
import PieChart from "./pie-chart/PieChart";
import BarChart from "./bar-chart/BarChart";
import { ChartTypes } from "../../../../models/enums/ChartTypes.enum";
import { ISelectedAssets } from "../../../../models/interfaces/SelectedAssets";
import { IChartSettings } from "../../../../models/interfaces/ChartSettings";

interface IChartSelector {
  selectedAssets: ISelectedAssets;
  chartSettings: IChartSettings;
}

const ChartSelector: React.FC<IChartSelector> = ({
  selectedAssets,
  chartSettings,
}) => {
  const { StackedBar, Pie, Bar } = ChartTypes;

  const renderCurrentChart = () => {
    switch (chartSettings.currentChart) {
      case StackedBar:
        return (
          <StackedBarChart
            selectedAssets={selectedAssets}
            chartSettings={chartSettings}
          />
        );

      case Pie:
        return (
          <PieChart
            selectedAssets={selectedAssets}
            chartSettings={chartSettings}
          />
        );

      case Bar:
        return (
          <BarChart
            selectedAssets={selectedAssets}
            chartSettings={chartSettings}
          />
        );
    }
  };

  return <>{renderCurrentChart()}</>;
};

export default ChartSelector;
