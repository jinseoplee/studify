import { ResponsiveBar } from "@nivo/bar";
import { useSelector } from "react-redux";

const StudyTimeRecord = () => {
  const data = useSelector((state) => state.userinfo.userTime);
  return (
    <div style={{ width: 850, height: 250 }}>
      <ResponsiveBar
        data={data}
        keys={["time"]}
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
          legend: "time",
          legendPosition: "middle",
          legendOffset: -40,
        }}
      />
    </div>
  );
};

export default StudyTimeRecord;
