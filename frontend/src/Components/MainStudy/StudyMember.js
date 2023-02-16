import { useOutletContext } from "react-router-dom";
import memberpic from "../../assets/image/memberpic.png";
import Style from "../../Style/MainStudy/StudyOutlet.module.css";

const StudyMember = () => {
  const { studydata } = useOutletContext();

  return (
    <div className={Style.StudyMembercontainer}>
      <div className={Style.StudyMemberBox}>
        <div className={Style.Maintainerbox}>
          <img alt="member" src={memberpic} className={Style.userImg}></img>
          <div>
            <h5 style={{ fontSize: "25px" }}>스터디장</h5>
            <div className={Style.userTitle}>
              <p>
                {studydata.users[0].region} {studydata.users[0].classNum}반
              </p>
              <p style={{ marginLeft: "7px" }}> {studydata.users[0].name}</p>
            </div>
          </div>
        </div>
        <div className={Style.StudyMemberList}>
          {studydata.users &&
            studydata.users.slice(1).map((study) => (
              <div key={study.id} className={Style.MemberListItem}>
                <img
                  alt="member"
                  src={memberpic}
                  style={{ width: "5vw" }}
                ></img>
                <h5>스터디 팀원</h5>
                <p>{study.name}</p>
                <p>{study.generation} 기</p>
                <p>{study.classNum} 반</p>
                <p>{study.region}</p>
                <p>공부시간 {study.totalTime / 3600}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMember;
