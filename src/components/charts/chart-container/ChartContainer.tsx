import React, { useEffect, useState } from "react";
import ChartSettings from "./chart-settings/ChartSettings";
import ChartSelector from "./chart-selector/ChartSelector";
import InformationPanel from "../../ui/information-panel/InformationPanel";
import { ICryptoAsset } from "../../../models/interfaces/CryptoAsset";
import { ChartTypes } from "../../../models/enums/ChartTypes.enum";

interface IChartContainer {
  selectedAssets: any;
  onResetSelection: () => void;
  onClosePanel: (panelTitle: string) => void;
}

const ChartContainer: React.FC<IChartContainer> = ({
  selectedAssets,
  onResetSelection,
  onClosePanel,
}) => {
  const { StackedBar } = ChartTypes;
  const [chartSettings, setChartSettings] = useState({
    currentChart: StackedBar,
    currentComparisonTitle: "Price",
    currentComparisonKey: "priceUsd",
    percentageOfTotalKey: "percentageOfTotal",
  });

  const handleChangeGraphic = ({ id: chartTabId }: any) => {
    setChartSettings({
      ...chartSettings,
      currentChart: chartTabId,
    });
  };

  const handleChangeComparisonPill = ({
    title,
    keyFromAsset,
    percentageOfTotalKey,
  }: any) => {
    setChartSettings({
      ...chartSettings,
      currentComparisonTitle: title,
      currentComparisonKey: keyFromAsset,
      percentageOfTotalKey,
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center space-y-8 my-4">
        <ChartSettings
          onChangeGraphicTab={handleChangeGraphic}
          onChangeComparisonPill={handleChangeComparisonPill}
        />
      </div>

      <ChartSelector
        selectedAssets={selectedAssets}
        onResetSelection={onResetSelection}
        chartSettings={chartSettings}
      />

      <div className="w-full flex flex-wrap justify-center">
        {selectedAssets.assets.map((asset: ICryptoAsset) => {
          return (
            <InformationPanel
              key={asset.id}
              panelTitle={asset.symbol}
              panelNumber={asset[chartSettings.currentComparisonKey]}
              backgroundColor={asset.color}
              backgroundAlpha={0.3}
              percentage={`(${Number(
                asset[chartSettings.percentageOfTotalKey]
              ).toFixed(2)})%`}
              onClosePanel={onClosePanel}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChartContainer;
