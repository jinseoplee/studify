import { ResponsiveTimeRange } from "@nivo/calendar";
import { streamData } from "../UI/streamData";

const StudyMonthly = () => {
  return (
    <div style={{ height: 330 }}>
      <ResponsiveTimeRange
        data={streamData}
        from="2021-03-01"
        to="2021-03-31"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        dayBorderWidth={2}
        weekdayLegendOffset={80}
        dayBorderColor="#ffffff"
        legends={[]}
      />
    </div>
  );
};

export default StudyMonthly;
