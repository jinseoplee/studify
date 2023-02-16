import { ResponsiveBar } from "@nivo/bar";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";

const StudyRecordDetail = ({ userTime }) => {
  return (
    <div style={{ width: "40vw", height: 230 }}>
      <h3
        className={Dashboardstyle.flexrangebox}
        style={{ fontSize: "22px", marginLeft: "13px" }}
      >
        나의 공부시간
      </h3>
      {userTime && userTime.length === 0 && (
        <p style={{ marginLeft: "14px", fontSize: "15px" }}>
          스터디 시간이 없습니다
        </p>
      )}
      {userTime && userTime.length > 0 && (
        <ResponsiveBar
          data={userTime}
          keys={["studyTime"]}
          indexBy="day"
          layout="horizontal"
          margin={{ top: 0, right: 60, bottom: 50, left: 110 }}
          padding={0.7}
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
            legend: "",
            legendPosition: "middle",
            legendOffset: -60,
          }}
        />
      )}
    </div>
  );
};
export default StudyRecordDetail;
