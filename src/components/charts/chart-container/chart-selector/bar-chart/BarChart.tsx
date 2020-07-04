import React, { useState } from "react";
import ChartCaption from "../chart-caption/ChartCaption";
import {
  transformNumberToReadableFormat,
  billion,
} from "../../../../../utilities/utilities";
import { ICryptoAsset } from "../../../../../models/interfaces/CryptoAsset";
import { ResponsiveBar } from "@nivo/bar";

interface IBarChart {
  selectedAssets: any;
  chartSettings: any;
}

const BarChart: React.FC<IBarChart> = ({ selectedAssets, chartSettings }) => {
  const [currentLayout, setCurrentLayout] = useState();

  const barChartData = selectedAssets.assets.map((asset: ICryptoAsset) => {
    const assetSupply = Number(asset.supply);
    const assetSupplyToDisplay =
      assetSupply < billion ? assetSupply / billion : assetSupply;

    const assetVolume = Number(asset.volumeUsd24Hr);
    const assetVolumeToDisplay =
      assetVolume < billion ? assetVolume / billion : assetVolume;

    const assetMarketShare = Number(asset.marketCapUsd);
    const assetMarketShareToDisplay =
      assetMarketShare < billion
        ? assetMarketShare / billion
        : assetMarketShare;

    return {
      id: asset.id,
      asset: `${asset.name} (${asset.symbol})`,
      supply: Number(
        transformNumberToReadableFormat(assetSupplyToDisplay, true)
      ),
      supplyColor: asset.color,
      "volume (24hr)": Number(
        transformNumberToReadableFormat(assetVolumeToDisplay, true)
      ),
      "volume (24hr)Color": "hsl(215, 70%, 50%)",
      "market share": Number(
        transformNumberToReadableFormat(assetMarketShareToDisplay, true)
      ),
      "market shareColor": "hsl(271, 70%, 50%)",
    };
  });

  const handleToggleLayout = () => {
    const newLayout =
      !currentLayout || currentLayout === "vertical"
        ? "horizontal"
        : "vertical";
    setCurrentLayout(newLayout);
  };

  return (
    <figure style={{ height: "350px", width: "80%", marginBottom: "120px" }}>
      <ResponsiveBar
        data={barChartData}
        keys={["market share", "supply", "volume (24hr)"]}
        indexBy="asset"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        layout={currentLayout || "vertical"}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />

      <div style={{ marginTop: "20px" }}>
        <div className="flex justify-center mb-2">
          <button
            className="bg-blue-600 p-2 font-bold text-white hover:bg-blue-700 focus:border-blue-500"
            onClick={handleToggleLayout}
          >
            Toggle layout
          </button>
        </div>

        <ChartCaption chartSettings={chartSettings} />
      </div>
    </figure>
  );
};

export default BarChart;
