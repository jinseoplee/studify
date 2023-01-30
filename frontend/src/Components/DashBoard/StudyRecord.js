import Dashboardstyle from "./Dashboard.module.css";
const StudyRecord = () => {
  return (
    <div className={Dashboardstyle.StudyRecordContainer}>
      <h3>나의 기록</h3>
      <div className={Dashboardstyle.StudyRecordbox}>
        <div className={Dashboardstyle.StudyRecordTime}>공부시간</div>
        <div className={Dashboardstyle.StudyRecordStrick}>스트릭</div>
      </div>
    </div>
  );
};

export default StudyRecord;
