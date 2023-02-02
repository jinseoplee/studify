import { useSelector } from "react-redux";
import { ResponsiveBar } from "@nivo/bar";

import ModalContainer from "../UI/ModalContainer";
import DashModal from "./Dashboard.module.css";

const StudyRecordDetail = ({ open, onClose }) => {
  const data = useSelector((state) => state.userinfo.userTime);

  if (!open) return null;
  return (
    <ModalContainer onClick={onClose}>
      <div className={DashModal.RecordModalContainer} onClick={onClose}>
        <p onClick={onClose}>x</p>
        <div className={DashModal.RecordModalBody}>
          <div style={{ width: 700, height: 500 }}>
            <ResponsiveBar
              data={data}
              keys={["time"]}
              indexBy="day"
              layout="horizontal"
              margin={{ top: 50, right: 60, bottom: 50, left: 80 }}
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
                legend: "",
                legendPosition: "middle",
                legendOffset: -60,
              }}
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
export default StudyRecordDetail;
