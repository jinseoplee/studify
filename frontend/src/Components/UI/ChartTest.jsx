import { ResponsiveCalendar } from "@nivo/calendar";

import { streamData } from "./streamData";
const Stream = () => {
  return (
    <div style={{ height: 400 }}>
      <h2>Nivo Calendar</h2>
      <ResponsiveCalendar
        data={streamData}
        from="2021-03-01"
        to="2021-04-01"
        granularity="month"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
        }}
        monthSpacing={20}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
};

export default Stream;
