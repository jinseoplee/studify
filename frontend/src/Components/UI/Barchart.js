// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Barchart = () => {
  const data = [
    {
      country: "AD",
      "hot dog": 51,
      "hot dogColor": "hsl(147, 70%, 50%)",
      burger: 10,
      burgerColor: "hsl(58, 70%, 50%)",
      sandwich: 66,
      sandwichColor: "hsl(266, 70%, 50%)",
      kebab: 131,
      kebabColor: "hsl(285, 70%, 50%)",
      fries: 184,
      friesColor: "hsl(350, 70%, 50%)",
      donut: 64,
      donutColor: "hsl(103, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 113,
      "hot dogColor": "hsl(85, 70%, 50%)",
      burger: 140,
      burgerColor: "hsl(144, 70%, 50%)",
      sandwich: 94,
      sandwichColor: "hsl(45, 70%, 50%)",
      kebab: 153,
      kebabColor: "hsl(92, 70%, 50%)",
      fries: 103,
      friesColor: "hsl(325, 70%, 50%)",
      donut: 106,
      donutColor: "hsl(318, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 54,
      "hot dogColor": "hsl(322, 70%, 50%)",
      burger: 118,
      burgerColor: "hsl(254, 70%, 50%)",
      sandwich: 48,
      sandwichColor: "hsl(337, 70%, 50%)",
      kebab: 70,
      kebabColor: "hsl(265, 70%, 50%)",
      fries: 126,
      friesColor: "hsl(285, 70%, 50%)",
      donut: 124,
      donutColor: "hsl(279, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 159,
      "hot dogColor": "hsl(41, 70%, 50%)",
      burger: 185,
      burgerColor: "hsl(341, 70%, 50%)",
      sandwich: 26,
      sandwichColor: "hsl(267, 70%, 50%)",
      kebab: 80,
      kebabColor: "hsl(286, 70%, 50%)",
      fries: 95,
      friesColor: "hsl(63, 70%, 50%)",
      donut: 177,
      donutColor: "hsl(227, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 106,
      "hot dogColor": "hsl(143, 70%, 50%)",
      burger: 50,
      burgerColor: "hsl(126, 70%, 50%)",
      sandwich: 29,
      sandwichColor: "hsl(142, 70%, 50%)",
      kebab: 77,
      kebabColor: "hsl(312, 70%, 50%)",
      fries: 184,
      friesColor: "hsl(32, 70%, 50%)",
      donut: 187,
      donutColor: "hsl(77, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 67,
      "hot dogColor": "hsl(291, 70%, 50%)",
      burger: 47,
      burgerColor: "hsl(43, 70%, 50%)",
      sandwich: 133,
      sandwichColor: "hsl(334, 70%, 50%)",
      kebab: 183,
      kebabColor: "hsl(261, 70%, 50%)",
      fries: 1,
      friesColor: "hsl(196, 70%, 50%)",
      donut: 144,
      donutColor: "hsl(131, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 171,
      "hot dogColor": "hsl(122, 70%, 50%)",
      burger: 4,
      burgerColor: "hsl(231, 70%, 50%)",
      sandwich: 39,
      sandwichColor: "hsl(10, 70%, 50%)",
      kebab: 61,
      kebabColor: "hsl(148, 70%, 50%)",
      fries: 152,
      friesColor: "hsl(293, 70%, 50%)",
      donut: 61,
      donutColor: "hsl(163, 70%, 50%)",
    },
  ];
  return (
    <div>
      <h1>차트</h1>
      <ResponsiveBar
        data={data}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
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
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
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
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
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
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      />
    </div>
  );
};

export default Barchart;
