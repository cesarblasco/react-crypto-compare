import React, { useState } from "react";
import Tabs from "../../../ui/tabs/Tabs";
import Pills from "../../../ui/pills/Pills";
import { ChartTypes } from "../../../../models/enums/ChartTypes.enum";
import { ComparisonTypes } from "../../../../models/enums/ComparisonTypes.enum";

interface IChartSettings {
  onChangeChartTab: (selectedChartTab: any) => void;
  onChangeComparisonPill: (selectedComparisonPill: any) => void;
}

const ChartSettings: React.FC<IChartSettings> = ({
  onChangeChartTab,
  onChangeComparisonPill,
}) => {
  const { StackedBar, Pie, Bar, Volume24hr } = ChartTypes;
  const { Price, MarketShare, Supply } = ComparisonTypes;

  const chartTabs = [
    {
      id: StackedBar,
      title: "Horizontal Stacked Bar",
      visible: true,
      active: true,
    },
    {
      id: Pie,
      title: "Pie chart",
      visible: true,
      active: false,
    },
    {
      id: Bar,
      title: "Multiple Bar chart",
      visible: true,
      active: false,
    },
  ];

  const chartComparisonPills = [
    {
      id: Price,
      title: "Price",
      keyFromAsset: "priceUsd",
      percentageOfCurrentComparisonTotalKey: "percentageOfTotal",
      totalOfSelectedKey: "totalPrice",
      visible: true,
      active: false,
    },
    {
      id: MarketShare,
      title: "Market Cap",
      keyFromAsset: "marketCapUsd",
      percentageOfCurrentComparisonTotalKey: "marketSharePercentageOfTotal",
      totalOfSelectedKey: "totalMarketShare",
      visible: true,
      active: false,
    },
    {
      id: Supply,
      title: "Supply",
      keyFromAsset: "supply",
      percentageOfCurrentComparisonTotalKey: "supplyPercentageOfTotal",
      totalOfSelectedKey: "totalSupply",
      visible: true,
      active: false,
    },
    {
      id: Volume24hr,
      title: "Volume (24 hr)",
      keyFromAsset: "volumeUsd24Hr",
      percentageOfCurrentComparisonTotalKey: "volume24hrPercentageOfTotal",
      totalOfSelectedKey: "totalVolume24hr",
      visible: true,
      active: false,
    },
  ];

  const [currentChartTab, setCurrentChartTab] = useState(chartTabs[0]);
  const [currentComparisonPill, setCurrentComparisonPill] = useState(
    chartComparisonPills[0]
  );

  const handleChartTabChange = (selectedChartTab: any) => {
    setCurrentChartTab(selectedChartTab);
    onChangeChartTab(selectedChartTab);
  };

  const handleComparisonPillChange = (selectedComparisonPill: any) => {
    setCurrentComparisonPill(selectedComparisonPill);
    onChangeComparisonPill(selectedComparisonPill);
  };

  return (
    <>
      <Tabs
        tabs={chartTabs}
        onChangeTab={handleChartTabChange}
        selectedTab={currentChartTab}
        fontSize={19}
      />

      <div className="mt-4">
        <Pills
          pills={chartComparisonPills}
          selectedPill={currentComparisonPill}
          onClick={handleComparisonPillChange}
        />
      </div>
    </>
  );
};

export default ChartSettings;
