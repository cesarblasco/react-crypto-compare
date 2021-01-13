import React, { useContext } from "react";
import ReactTooltip from "react-tooltip";
import ChartCaption from "../chart-caption/ChartCaption";
import { ICryptoAsset } from "../../../../../models/interfaces/CryptoAsset";
import { ChartContext } from "../../../../../contexts/chart-context/ChartContext";
import { AppContext } from "../../../../../contexts/app-context/AppContext";

const StackedBarChart: React.FC = () => {
  const nf = Intl.NumberFormat();

  const { state: appContextState } = useContext(AppContext); 
  const { state: chartContextState } = useContext(ChartContext);

  return (
    <>
      <figure className="w-full h-16 mt-4 mb-8">
        {appContextState.selectedAssets.assets.map((asset: ICryptoAsset) => {
          return (
            <div
              key={asset.id}
              data-tip
              data-for={`assetTooltip-${asset.id}`}
              style={{
                backgroundColor: asset.color,
                width: `${
                  asset[chartContextState.percentageOfCurrentComparisonTotalKey]
                }%`,
              }}
              className="inline-block h-16 hover:border-solid hover:border-8 hover:border-yellow-500"
            >
              <ReactTooltip
                id={`assetTooltip-${asset.id}`}
                place="top"
                effect="solid"
                className="text-center"
              >
                {asset.name} ({asset.symbol}){" "}
                <div>
                  ${`${nf.format(asset[chartContextState.currentComparisonKey])}`} (
                  {Number(
                    asset[chartContextState.percentageOfCurrentComparisonTotalKey]
                  ).toFixed(2)}
                  %)
                </div>
              </ReactTooltip>
            </div>
          );
        })}

        <ChartCaption />
      </figure>
    </>
  );
};

export default StackedBarChart;
