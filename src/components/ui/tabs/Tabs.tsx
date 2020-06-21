import React, { useState, useEffect } from "react";

interface ITab {
  id: string;
  title: string;
  tooltip?: string;
  visible: boolean;
  active: boolean;
}

interface ITabs {
  tabs: ITab[];
  onChangeTab: (selectedTab: any) => void;
  selectedTab?: any;
  fontSize?: number;
}

const Tabs: React.FC<ITabs> = ({
  tabs,
  onChangeTab,
  selectedTab,
  fontSize = 14,
}) => {
  const initialState: any = {
    tabs,
    selectedTab,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const updatedTabs = state.tabs.map((tab: any) => {
      return {
        ...tab,
        active: selectedTab.id === tab.id,
      };
    });

    const newState = {
      selectedTab,
      tabs: [...updatedTabs],
    };

    setState(newState);
  }, [selectedTab]);

  // const handleSelectedTab = (tab: any) => {
  //   if (selectedTab.id !== tab.id) {
  //     onChangeTab(tab);

  //     const updatedTabs = state.tabs.map((tab: any) => {
  //       return {
  //         ...tab,
  //         active: selectedTab.id === tab.id,
  //       };
  //     });

  //     const newState = {
  //       selectedTab,
  //       tabs: [...updatedTabs],
  //     };

  //     setState(newState);

  //     console.log("a");
  //   }
  // };

  return (
    <div role="tablist">
      {state.tabs.map((tab: any) => {
        return (
          tab.visible && (
            <div
              key={tab.id}
              role="tab"
              className="inline-block mr-6"
              onClick={() => onChangeTab(tab)}
            >
              <span
                className={`font-bold ${
                  tab.active ? "text-blue-800 border-blue-800" : "text-gray-500"
                }  ml-0 mr-2 mt-0 mb-4 pb-1 cursor-pointer mb-2 border-solid border-b-2 hover:text-blue-800 hover:border-blue-800`}
                style={{ fontSize: `${fontSize}px` }}
              >
                {tab.title}
              </span>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Tabs;
