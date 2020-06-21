import React, { useEffect, useState } from "react";
import GraphicSettings from "./graphic-settings/GraphicSettings";
import GraphicSelector from "./graphic-selector/GraphicSelector";
import InformationPanel from "../../ui/information-panel/InformationPanel";

interface IGraphicContainer {
  selectedAssets: any;
  onResetSelection: () => void;
  onClosePanel: (panelTitle: string) => void;
}

const GraphicContainer: React.FC<IGraphicContainer> = ({
  selectedAssets,
  onResetSelection,
  onClosePanel,
}) => {
  const [graphicSettings, setGraphicSettings] = useState({
    currentGraphic: "bar",
    currentComparisonTitle: "Price",
    currentComparisonKey: "priceUsd",
    percentageOfTotalKey: "percentageOfTotal",
  });

  const handleChangeGraphic = ({ id: graphicTabId }: any) => {
    setGraphicSettings({
      ...graphicSettings,
      currentGraphic: graphicTabId,
    });
  };

  const handleChangeComparisonPill = ({
    title,
    keyFromAsset,
    percentageOfTotalKey,
  }: any) => {
    setGraphicSettings({
      ...graphicSettings,
      currentComparisonTitle: title,
      currentComparisonKey: keyFromAsset,
      percentageOfTotalKey,
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center space-y-8 mt-4">
        <GraphicSettings
          onChangeGraphicTab={handleChangeGraphic}
          onChangeComparisonPill={handleChangeComparisonPill}
        />
      </div>

      <GraphicSelector
        selectedAssets={selectedAssets}
        onResetSelection={onResetSelection}
        graphicSettings={graphicSettings}
      />

      <div className="w-full">
        {selectedAssets.assets.map((asset: any) => {
          return (
            <InformationPanel
              key={asset.id}
              panelTitle={asset.symbol}
              panelNumber={asset[graphicSettings.currentComparisonKey]}
              backgroundColor={asset.color}
              backgroundAlpha={0.3}
              percentage={`(${Number(
                asset[graphicSettings.percentageOfTotalKey]
              ).toFixed(2)})%`}
              onClosePanel={onClosePanel}
            />
          );
        })}
      </div>
    </>
  );
};

export default GraphicContainer;
