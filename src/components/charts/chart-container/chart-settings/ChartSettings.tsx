import React, { useState } from "react";
import Tabs from "../../../ui/tabs/Tabs";
import Pills from "../../../ui/pills/Pills";
import { ChartTypes } from "../../../../models/enums/ChartTypes.enum";
import { ComparisonTypes } from "../../../../models/enums/ComparisonTypes.enum";

interface IChartSettings {
  onChangeGraphicTab: (selectedGraphicTab: any) => void;
  onChangeComparisonPill: (selectedComparisonPill: any) => void;
}

const ChartSettings: React.FC<IChartSettings> = ({
  onChangeGraphicTab,
  onChangeComparisonPill,
}) => {
  const { StackedBar, Pie, Bar } = ChartTypes;
  const { Price, MarketShare } = ComparisonTypes;

  const graphicTabs = [
    {
      id: StackedBar,
      title: "Stacked Bar",
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
      title: "Bar chart",
      visible: true,
      active: false,
    },
  ];

  const graphicComparisonPills = [
    {
      id: Price,
      title: "Price",
      keyFromAsset: "priceUsd",
      percentageOfTotalKey: "percentageOfTotal",
      visible: true,
      active: false,
    },
    {
      id: MarketShare,
      title: "Market Cap",
      keyFromAsset: "marketCapUsd",
      percentageOfTotalKey: "marketSharePercentageOfTotal",
      visible: true,
      active: false,
    },
  ];

  const [currentGraphicTab, setCurrentGraphicTab] = useState(graphicTabs[0]);
  const [currentComparisonPill, setCurrentComparisonPill] = useState(
    graphicComparisonPills[0]
  );

  const handleGraphicTabChange = (selectedGraphicTab: any) => {
    setCurrentGraphicTab(selectedGraphicTab);
    onChangeGraphicTab(selectedGraphicTab);
  };

  const handleComparisonPillChange = (selectedComparisonPill: any) => {
    setCurrentComparisonPill(selectedComparisonPill);
    onChangeComparisonPill(selectedComparisonPill);
  };

  return (
    <>
      {currentGraphicTab ? (
        <Tabs
          tabs={graphicTabs}
          onChangeTab={handleGraphicTabChange}
          selectedTab={currentGraphicTab}
          fontSize={19}
        />
      ) : null}
      <div className="mt-4">
        <Pills
          pills={graphicComparisonPills}
          selectedPill={currentComparisonPill}
          onClick={handleComparisonPillChange}
        />
      </div>
    </>
  );
};

export default ChartSettings;
