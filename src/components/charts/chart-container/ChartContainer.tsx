import React, { useState } from "react";
import ChartSettings from "./chart-settings/ChartSettings";
import ChartSelector from "./chart-selector/ChartSelector";
import InformationPanel from "../../ui/information-panel/InformationPanel";
import { ICryptoAsset } from "../../../models/interfaces/CryptoAsset";
import { ISelectedAssets } from "../../../models/interfaces/SelectedAssets";
import { ChartTypes } from "../../../models/enums/ChartTypes.enum";

interface IChartContainer {
  selectedAssets: ISelectedAssets;
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
    totalOfSelectedKey: "totalPrice",
  });

  const handleChangeChart = ({ id: chartTabId }: any) => {
    setChartSettings({
      ...chartSettings,
      currentChart: chartTabId,
    });
  };

  const handleChangeComparisonPill = ({
    title,
    keyFromAsset,
    percentageOfTotalKey,
    totalOfSelectedKey,
  }: any) => {
    setChartSettings({
      ...chartSettings,
      currentComparisonTitle: title,
      currentComparisonKey: keyFromAsset,
      percentageOfTotalKey,
      totalOfSelectedKey,
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center space-y-8 my-4">
        <ChartSettings
          onChangeChartTab={handleChangeChart}
          onChangeComparisonPill={handleChangeComparisonPill}
        />
      </div>

      <p className="text-left w-full">
        Total <strong>{chartSettings.currentComparisonTitle}</strong> of
        selected currencies:{" "}
        {chartSettings.currentComparisonTitle === "Price" ? (
          <span className="font-bold">
            ${Number(selectedAssets.information.totalPrice).toFixed(2)}
          </span>
        ) : (
          <span className="font-bold">
            ${selectedAssets.information[chartSettings.totalOfSelectedKey]}
          </span>
        )}
        <span
          onClick={onResetSelection}
          className="ml-2 underline font-blue-500 cursor-pointer"
        >
          Reset selection
        </span>
      </p>

      <ChartSelector
        selectedAssets={selectedAssets}
        chartSettings={chartSettings}
      />

      <div className="w-full flex flex-wrap justify-center">
        {selectedAssets.assets.map((asset: ICryptoAsset) => {
          return (
            <InformationPanel
              key={asset.id}
              panelTitle={asset.symbol}
              panelSubtitle={asset.name}
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
