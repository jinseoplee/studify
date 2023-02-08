import { useState } from "react";
// import { useSelector } from "react-redux";

import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";
// import StudyTimeRecord from "./StudyTimeRecord";
import StudyRecordDetail from "./StudyRecordDetail";
import StudyTodo from "./StudyTodo";
import StudyMonthly from "./StudyMonthly";

const StudyRecord = () => {
  // const data = useSelector((state) => state.userinfo.userTime);
  // const todayDay = new Date().getDay() - 1;
  // const todaydata = [data[todayDay]];

  //모달 관련
  const [openRecordModal, setRecordOpenModal] = useState(false);
  const [openTodoModal, setTodoModal] = useState(false);

  return (
    <div className={Dashboardstyle.StudyRecordContainer}>
      <StudyRecordDetail
        open={openRecordModal}
        onClose={() => setRecordOpenModal(false)}
      />
      <StudyTodo open={openTodoModal} onClose={() => setTodoModal(false)} />
      <h3>나의 기록</h3>
      <div className={Dashboardstyle.StudyRecordbox}>
        <div className={Dashboardstyle.StudyRecordTime}>
          <p onClick={() => setRecordOpenModal(true)}> + </p>
          <p>오늘의 스터디</p>
          <p>스터디 평균</p>
        </div>
        <div
          className={Dashboardstyle.StudyRecordStrick}
          onClick={() => setTodoModal(true)}
        >
          <StudyMonthly />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default StudyRecord;
