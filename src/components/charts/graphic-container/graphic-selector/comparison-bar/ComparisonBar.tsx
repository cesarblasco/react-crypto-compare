import React from "react";
import ReactTooltip from "react-tooltip";

interface IComparisonBar {
  selectedAssets: any;
  graphicSettings: any;
}

const ComparisonBar: React.FC<IComparisonBar> = ({
  selectedAssets,
  graphicSettings,
}) => {
  return (
    <>
      <div className="w-full h-16 mt-4 mb-8">
        {selectedAssets.assets.map((asset: any) => {
          return (
            <div
              key={asset.id}
              data-tip
              data-for={`assetTooltip-${asset.id}`}
              style={{
                backgroundColor: asset.color,
                width: `${asset[graphicSettings.percentageOfTotalKey]}%`,
              }}
              className="inline-block h-16 hover:border-solid hover:border-8 hover:border-yellow-500"
            >
              <ReactTooltip
                id={`assetTooltip-${asset.id}`}
                place="top"
                effect="solid"
              >
                {asset.name} ({asset.symbol})
              </ReactTooltip>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ComparisonBar;
