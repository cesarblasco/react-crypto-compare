import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { transformNumberToReadableFormat } from "../../../../../utilities/utilities";
import { ICryptoAsset } from "../../../../../models/interfaces/CryptoAsset";
import { ISelectedAssets } from "../../../../../models/interfaces/SelectedAssets";

interface IPieChart {
  selectedAssets: ISelectedAssets;
  graphicSettings: any;
}

const PieChart: React.FC<IPieChart> = ({ selectedAssets, graphicSettings }) => {
  const pieChartData = selectedAssets.assets.map((asset: any) => {
    return {
      id: asset.id,
      label: `${asset.name} (${asset.symbol})`,
      value: Number(
        transformNumberToReadableFormat(
          asset[graphicSettings.currentComparisonKey],
          true,
          graphicSettings.currentComparisonKey === "marketCapUsd"
        )
      ),
      color: asset.color,
    };
  });

  const assetColors = selectedAssets.assets.map((asset: ICryptoAsset) => {
    return asset.color;
  });

  return (
    <div style={{ height: "400px", width: "500px" }}>
      <ResponsivePie
        data={pieChartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={assetColors}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#000"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default PieChart;
