import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const StudyBarChart = () => {
  const data = [
    {
      day: "Monday",
      degress: 59,
    },
    {
      day: "Tuesday",
      degress: 61,
    },
    {
      day: "Wednesday",
      degress: 55,
    },
    {
      day: "Thursday",
      degress: 78,
    },
    {
      day: "Friday",
      degress: 71,
    },
    {
      day: "Saturday",
      degress: 56,
    },
    {
      day: "Sunday",
      degress: 67,
    },
  ];
  return (
    <div style={{ height: 400 }}>
      <h1>차트!!</h1>
      <ResponsiveBar
        data={data}
        keys={["degress"]}
        indexBy="day"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.4}
        valueScale={{ type: "linear" }}
        colors="#3182CE"
        animate={true}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "degrees",
          legendPosition: "middle",
          legendOffset: -40,
        }}
      />
    </div>
  );
};

export default StudyBarChart;
