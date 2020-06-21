import React, { useState } from "react";
import ComparisonBar from "./comparison-bar/ComparisonBar";
import PieChart from "./pie-chart/PieChart";
import BarChart from "./bar-chart/BarChart";

interface IGraphicSelector {
  selectedAssets: any;
  graphicSettings: any;
  onResetSelection: () => void;
}

const GraphicSelector: React.FC<IGraphicSelector> = ({
  selectedAssets,
  graphicSettings,
  onResetSelection,
}) => {
  const renderCurrentGraphic = () => {
    switch (graphicSettings.currentGraphic) {
      case "bar":
        return (
          <ComparisonBar
            selectedAssets={selectedAssets}
            graphicSettings={graphicSettings}
          />
        );

      case "pie":
        return (
          <PieChart
            selectedAssets={selectedAssets}
            graphicSettings={graphicSettings}
          />
        );

      case "barChart":
        return (
          <BarChart
            selectedAssets={selectedAssets}
            graphicSettings={graphicSettings}
          />
        );
    }
  };

  return (
    <>
      <p className="text-left w-full">
        Total <strong>{graphicSettings.currentComparisonTitle}</strong> of
        selected currencies:{" "}
        {graphicSettings.currentComparisonTitle === "Price" ? (
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
      {renderCurrentGraphic()}
    </>
  );
};

export default GraphicSelector;
