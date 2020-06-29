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
  onResetSelection: () => void;
}

const ChartSelector: React.FC<IChartSelector> = ({
  selectedAssets,
  chartSettings,
  onResetSelection,
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

  return (
    <>
      <p className="text-left w-full">
        Total <strong>{chartSettings.currentComparisonTitle}</strong> of
        selected currencies:{" "}
        {chartSettings.currentComparisonTitle === "Price" ? (
          <span className="font-bold">
            ${Number(selectedAssets.information.totalPrice).toFixed(2)}
          </span>
        ) : (
          <span className="font-bold">
            ${selectedAssets.information.totalMarketShare}
          </span>
        )}
        <span
          onClick={onResetSelection}
          className="ml-2 underline font-blue-500 cursor-pointer"
        >
          Reset selection
        </span>
      </p>
      {renderCurrentChart()}
    </>
  );
};

export default ChartSelector;
