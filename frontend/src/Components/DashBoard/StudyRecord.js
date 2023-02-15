import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";
import StudyRecordDetail from "./StudyRecordDetail";
import StudyMonthly from "./StudyMonthly";
import axios from "axios";

const StudyRecord = ({ userData }) => {
  const userToken = useSelector((state) => state.token.accesstoken);
  const [userTime, setUserTime] = useState([]);
  const todayDay = new Date().getDay() - 1;
  const [recordData, setRecordData] = useState("");

  //useEffect 로 시간 데이터 통신

  const userTimeHandler = async () => {
    try {
      const res = await axios.get("/api/v1/users/log", {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      });
      console.log(res);
      setUserTime(res.data.content);
      setRecordData(res.data.content[0].user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userTimeHandler();
  }, []);

  return (
    <div className={Dashboardstyle.StudyRecordContainer}>
      <h3 style={{ fontSize: "20px" }}>나의 기록</h3>
      <div className={Dashboardstyle.StudyRecordbox}>
        <div className={Dashboardstyle.StudyRecordTime}>
          <StudyRecordDetail userTime={userTime} />
        </div>
        <div className={Dashboardstyle.StudyRecordStrick}>
          <StudyMonthly
            user={userData}
            recordData={recordData}
            userTime={userTime}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default StudyRecord;
