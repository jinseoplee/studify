import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";
import book from "../../assets/image/book.png";
import userpic from "../../assets/image/memberpic.png";
const StudyMonthly = ({ recordData, user, userTime }) => {
  return (
    <div>
      <h3 className={Dashboardstyle.flexrangebox} style={{ fontSize: "20px" }}>
        나의 상태
      </h3>
      <div className={Dashboardstyle.DashMyStatus}>
        <img
          alt="book"
          src={book}
          style={{ width: "30px", marginLeft: "3px" }}
        ></img>
        <p>총 {Math.floor(recordData.totalTime / 3600)} 시간 공부</p>
        {!userTime[0] && <p>최근 스터디가 없습니다!</p>}
        <p>가장 최근 스터디는 {userTime[0] && userTime[0].day} 입니다</p>
      </div>
      <div className={Dashboardstyle.DashMyStatus}>
        <img
          alt="userpic"
          src={userpic}
          style={{ width: "30px", marginLeft: "3px", marginTop: "5px" }}
        ></img>
        {user.studies && user.studies.length <= 0 && (
          <p>스터디를 참가해주세요!</p>
        )}
        {user.studies && user.studies.length > 0 && (
          <p>{user.studies.length}개 스터디 참가</p>
        )}
        <p>{user.badges && user.badges.length}개 뱃지 보유</p>
      </div>
    </div>
  );
};

export default StudyMonthly;
