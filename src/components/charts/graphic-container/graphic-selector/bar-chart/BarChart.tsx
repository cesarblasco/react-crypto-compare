import React from "react";
import { ResponsiveBar } from "@nivo/bar";

// import { ResponsivePie } from "@nivo/pie";
// import { hexToRGBA, transformNumberToReadableFormat } from "../../utils/utils";

interface IBarChart {
  selectedAssets: any;
  graphicSettings: any;
}

const BarChart: React.FC<IBarChart> = ({ selectedAssets, graphicSettings }) => {
  //   const pieChartData = selectedAssets.assets.map((asset: any) => {
  //     return {
  //       id: asset.id,
  //       label: `${asset.name} (${asset.symbol})`,
  //       value: Number(
  //         transformNumberToReadableFormat(
  //           asset[graphicSettings.currentComparisonKey],
  //           true
  //         )
  //       ),
  //       color: asset.color,
  //     };
  //   });

  //   console.log({ selectedAssets }, { graphicSettings }, { pieChartData });

  const data = [
    {
      country: "AD",
      "hot dog": 87,
      "hot dogColor": "hsl(271, 70%, 50%)",
      burger: 94,
      burgerColor: "hsl(28, 70%, 50%)",
      sandwich: 121,
      sandwichColor: "hsl(262, 70%, 50%)",
      kebab: 180,
      kebabColor: "hsl(215, 70%, 50%)",
      fries: 107,
      friesColor: "hsl(74, 70%, 50%)",
      donut: 74,
      donutColor: "hsl(34, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 174,
      "hot dogColor": "hsl(137, 70%, 50%)",
      burger: 124,
      burgerColor: "hsl(200, 70%, 50%)",
      sandwich: 133,
      sandwichColor: "hsl(11, 70%, 50%)",
      kebab: 64,
      kebabColor: "hsl(127, 70%, 50%)",
      fries: 99,
      friesColor: "hsl(106, 70%, 50%)",
      donut: 50,
      donutColor: "hsl(258, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 137,
      "hot dogColor": "hsl(240, 70%, 50%)",
      burger: 132,
      burgerColor: "hsl(344, 70%, 50%)",
      sandwich: 62,
      sandwichColor: "hsl(272, 70%, 50%)",
      kebab: 97,
      kebabColor: "hsl(208, 70%, 50%)",
      fries: 18,
      friesColor: "hsl(83, 70%, 50%)",
      donut: 92,
      donutColor: "hsl(225, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 61,
      "hot dogColor": "hsl(311, 70%, 50%)",
      burger: 38,
      burgerColor: "hsl(61, 70%, 50%)",
      sandwich: 33,
      sandwichColor: "hsl(272, 70%, 50%)",
      kebab: 60,
      kebabColor: "hsl(299, 70%, 50%)",
      fries: 60,
      friesColor: "hsl(33, 70%, 50%)",
      donut: 51,
      donutColor: "hsl(322, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 199,
      "hot dogColor": "hsl(3, 70%, 50%)",
      burger: 39,
      burgerColor: "hsl(269, 70%, 50%)",
      sandwich: 113,
      sandwichColor: "hsl(306, 70%, 50%)",
      kebab: 124,
      kebabColor: "hsl(301, 70%, 50%)",
      fries: 68,
      friesColor: "hsl(317, 70%, 50%)",
      donut: 71,
      donutColor: "hsl(228, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 184,
      "hot dogColor": "hsl(30, 70%, 50%)",
      burger: 120,
      burgerColor: "hsl(307, 70%, 50%)",
      sandwich: 70,
      sandwichColor: "hsl(260, 70%, 50%)",
      kebab: 156,
      kebabColor: "hsl(92, 70%, 50%)",
      fries: 181,
      friesColor: "hsl(138, 70%, 50%)",
      donut: 198,
      donutColor: "hsl(77, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 7,
      "hot dogColor": "hsl(229, 70%, 50%)",
      burger: 65,
      burgerColor: "hsl(31, 70%, 50%)",
      sandwich: 162,
      sandwichColor: "hsl(71, 70%, 50%)",
      kebab: 184,
      kebabColor: "hsl(93, 70%, 50%)",
      fries: 9,
      friesColor: "hsl(35, 70%, 50%)",
      donut: 27,
      donutColor: "hsl(285, 70%, 50%)",
    },
  ];

  return (
    <div style={{ height: "350px", width: "500px" }}>
      <ResponsiveBar
        data={data}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
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
    </div>
  );
};

export default BarChart;
