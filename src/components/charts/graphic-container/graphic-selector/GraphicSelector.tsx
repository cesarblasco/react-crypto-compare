import React from "react";
import ComparisonBar from "./comparison-bar/ComparisonBar";
import PieChart from "./pie-chart/PieChart";
import BarChart from "./bar-chart/BarChart";
import { GraphicTypes } from "../../../../models/enums/GraphicTypes.enum";
import { ISelectedAssets } from "../../../../models/interfaces/SelectedAssets";

interface IGraphicSelector {
  selectedAssets: ISelectedAssets;
  graphicSettings: any;
  onResetSelection: () => void;
}

const GraphicSelector: React.FC<IGraphicSelector> = ({
  selectedAssets,
  graphicSettings,
  onResetSelection,
}) => {
  const { HorizontalBar, Pie, Bar } = GraphicTypes;

  const renderCurrentGraphic = () => {
    switch (graphicSettings.currentGraphic) {
      case HorizontalBar:
        return (
          <ComparisonBar
            selectedAssets={selectedAssets}
            graphicSettings={graphicSettings}
          />
        );

      case Pie:
        return (
          <PieChart
            selectedAssets={selectedAssets}
            graphicSettings={graphicSettings}
          />
        );

      case Bar:
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
