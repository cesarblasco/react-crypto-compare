import React, { useState, useContext } from "react";
import ChartSettings from "./chart-settings/ChartSettings";
import ChartSelector from "./chart-selector/ChartSelector";
import InformationPanel from "../../ui/information-panel/InformationPanel";
import { ICryptoAsset } from "../../../models/interfaces/CryptoAsset";
import { ISelectedAssets } from "../../../models/interfaces/SelectedAssets";
import { ChartTypes } from "../../../models/enums/ChartTypes.enum";
import { AppContext } from "../../../contexts/AppContext";
import { onResetSelectionActionCreator } from "../../../contexts/action-creators/ActionCreators";

interface IChartContainer {
  selectedAssets: ISelectedAssets;
}

const ChartContainer: React.FC<IChartContainer> = ({
  selectedAssets,
}) => {
  const { dispatch } = useContext(AppContext)

  const { StackedBar } = ChartTypes;
  const [chartSettings, setChartSettings] = useState({
    currentChart: StackedBar,
    currentComparisonTitle: "Price",
    currentComparisonKey: "priceUsd",
    percentageOfCurrentComparisonTotalKey: "percentageOfTotal",
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
    percentageOfCurrentComparisonTotalKey,
    totalOfSelectedKey,
  }: any) => {
    setChartSettings({
      ...chartSettings,
      currentComparisonTitle: title,
      currentComparisonKey: keyFromAsset,
      percentageOfCurrentComparisonTotalKey,
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
          onClick={() => dispatch(onResetSelectionActionCreator())}
          className="ml-2 underline font-blue-500 cursor-pointer"
        >
          Reset selection
        </span>
      </p>

      <ChartSelector
        selectedAssets={selectedAssets}
        chartSettings={chartSettings}
      />

      <div className="w-full flex flex-wrap justify-center mt-2">
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
                asset[chartSettings.percentageOfCurrentComparisonTotalKey]
              ).toFixed(2)})%`}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChartContainer;
