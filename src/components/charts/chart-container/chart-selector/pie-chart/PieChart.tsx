import React, { useContext } from "react";
import ChartCaption from "../chart-caption/ChartCaption";
import { ResponsivePie } from "@nivo/pie";
import { ICryptoAsset } from "../../../../../models/interfaces/CryptoAsset";
import { ChartContext } from "../../../../../contexts/chart-context/ChartContext";
import { AppContext } from "../../../../../contexts/app-context/AppContext";

const PieChart: React.FC = () => {
  const nf = Intl.NumberFormat();
  const { state: appContextState } = useContext(AppContext); 
  const { state: chartContextState } = useContext(ChartContext);

  const pieChartData = appContextState.selectedAssets.assets.map((asset: ICryptoAsset) => {
    let assetValue = asset[chartContextState.currentComparisonKey];
    return {
      id: asset.id,
      label: `${asset.name} (${asset.symbol})`,
      value: assetValue,
      color: asset.color,
    };
  });

  const assetColors = appContextState.selectedAssets.assets.map((asset: ICryptoAsset) => {
    return asset.color;
  });

  return (
    <figure style={{ height: "400px", width: "500px" }}>
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
        enableSlicesLabels={false}
        tooltip={({ label, value }) => (
          <>
            {label}: <strong>${nf.format(value)} </strong>
          </>
        )}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />

      <div style={{ marginTop: "-40px" }}>
        <ChartCaption />
      </div>
    </figure>
  );
};

export default PieChart;
