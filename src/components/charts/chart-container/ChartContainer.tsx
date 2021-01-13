import React, { useContext } from "react";
import ChartSettings from "./chart-settings/ChartSettings";
import ChartSelector from "./chart-selector/ChartSelector";
import InformationPanel from "../../ui/information-panel/InformationPanel";
import { ICryptoAsset } from "../../../models/interfaces/CryptoAsset";
import { AppContext } from "../../../contexts/app-context/AppContext";
import { ChartContext } from "../../../contexts/chart-context/ChartContext";
import { onResetSelectionActionCreator } from "../../../contexts/app-context/action-creators/ActionCreators";

const ChartContainer: React.FC = () => {
  const { state: appContextState, dispatch: appContextDispatch } = useContext(AppContext)
  const { state: chartContextState } = useContext(ChartContext);

  return (
    <>
      <div className="w-full flex flex-col items-center space-y-8 my-4">
        <ChartSettings/>
      </div>

      <p className="text-left w-full">
        Total <strong>{chartContextState.currentComparisonTitle}</strong> of
        selected currencies:{" "}
        {chartContextState.currentComparisonTitle === "Price" ? (
          <span className="font-bold">
            ${Number(appContextState.selectedAssets.information.totalPrice).toFixed(2)}
          </span>
        ) : (
          <span className="font-bold">
            ${appContextState.selectedAssets.information[chartContextState.totalOfSelectedKey]}
          </span>
        )}
        <span
          onClick={() => appContextDispatch(onResetSelectionActionCreator())}
          className="ml-2 underline font-blue-500 cursor-pointer"
        >
          Reset selection
        </span>
      </p>

      <ChartSelector />

      <div className="w-full flex flex-wrap justify-center mt-2">
        {appContextState.selectedAssets.assets.map((asset: ICryptoAsset) => {
          return (
            <InformationPanel
              key={asset.id}
              panelTitle={asset.symbol}
              panelSubtitle={asset.name}
              panelNumber={asset[chartContextState.currentComparisonKey]}
              backgroundColor={asset.color}
              backgroundAlpha={0.3}
              percentage={`(${Number(
                asset[chartContextState.percentageOfCurrentComparisonTotalKey]
              ).toFixed(2)})%`}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChartContainer;
