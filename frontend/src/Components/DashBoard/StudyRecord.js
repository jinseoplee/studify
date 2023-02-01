import Dashboardstyle from "./Dashboard.module.css";
import StudyTimeRecord from "./StudyTimeRecord";
const StudyRecord = () => {
  return (
    <div className={Dashboardstyle.StudyRecordContainer}>
      <h3>나의 기록</h3>
      <div className={Dashboardstyle.StudyRecordbox}>
        <div className={Dashboardstyle.StudyRecordTime}>
          <StudyTimeRecord />
        </div>
        <div className={Dashboardstyle.StudyRecordStrick}>스트릭</div>
      </div>
      <div></div>
    </div>
  );
};

export default StudyRecord;
