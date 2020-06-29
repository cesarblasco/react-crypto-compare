import React from "react";
import ReactTooltip from "react-tooltip";
import ChartCaption from "../chart-caption/ChartCaption";
import { IChartSettings } from "../../../../../models/interfaces/ChartSettings";
import { ICryptoAsset } from "../../../../../models/interfaces/CryptoAsset";
import { ISelectedAssets } from "../../../../../models/interfaces/SelectedAssets";
import { transformNumberToReadableFormat } from "../../../../../utilities/utilities";

interface IStackedBarChart {
  selectedAssets: ISelectedAssets;
  chartSettings: IChartSettings;
}

const StackedBarChart: React.FC<IStackedBarChart> = ({
  selectedAssets,
  chartSettings,
}) => {
  return (
    <>
      <figure className="w-full h-16 mt-4 mb-8">
        {selectedAssets.assets.map((asset: ICryptoAsset) => {
          return (
            <div
              key={asset.id}
              data-tip
              data-for={`assetTooltip-${asset.id}`}
              style={{
                backgroundColor: asset.color,
                width: `${asset[chartSettings.percentageOfTotalKey]}%`,
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
                  $
                  {`${transformNumberToReadableFormat(
                    asset[chartSettings.currentComparisonKey]
                  )}`}{" "}
                  (
                  {Number(asset[chartSettings.percentageOfTotalKey]).toFixed(2)}
                  %)
                </div>
              </ReactTooltip>
            </div>
          );
        })}

        <ChartCaption chartSettings={chartSettings} />
      </figure>
    </>
  );
};

export default StackedBarChart;
