import { ResponsiveBar } from "@nivo/bar";

const StudyTimeRecord = ({ data }) => {
  return (
    <div style={{ width: 850, height: 250 }}>
      <ResponsiveBar
        data={data}
        keys={["time"]}
        indexBy="day"
        layout="horizontal"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.8}
        valueScale={{ type: "linear" }}
        colors="#CABBE7"
        animate={true}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "time",
          legendPosition: "middle",
          legendOffset: -40,
        }}
      />
    </div>
  );
};

export default StudyTimeRecord;
