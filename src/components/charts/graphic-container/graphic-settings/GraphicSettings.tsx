import React, { useState } from "react";
import Tabs from "../../../ui/tabs/Tabs";
import Pills from "../../../ui/pills/Pills";

interface IGraphicSettings {
  onChangeGraphicTab: (selectedGraphicTab: any) => void;
  onChangeComparisonPill: (selectedComparisonPill: any) => void;
}

const GraphicSettings: React.FC<IGraphicSettings> = ({
  onChangeGraphicTab,
  onChangeComparisonPill,
}) => {
  const graphicTabs = [
    {
      id: "bar",
      title: "Horizontal Bar",
      visible: true,
      active: true,
    },
    {
      id: "pie",
      title: "Pie chart",
      visible: true,
      active: false,
    },
    {
      id: "barChart",
      title: "Bar chart",
      visible: true,
      active: false,
    },
  ];

  const graphicComparisonPills = [
    {
      id: "price",
      title: "Price",
      keyFromAsset: "priceUsd",
      percentageOfTotalKey: "percentageOfTotal",
      visible: true,
      active: false,
    },
    {
      id: "marketShare",
      title: "Market Cap",
      keyFromAsset: "marketCapUsd",
      percentageOfTotalKey: "marketSharePercentageOfTotal",
      visible: true,
      active: true,
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

export default GraphicSettings;
