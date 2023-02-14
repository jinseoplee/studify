import { useOutletContext } from "react-router-dom";
import memberpic from "../../assets/image/memberpic.png";
import Style from "../../Style/MainStudy/StudyOutlet.module.css";

const StudyMember = () => {
  const { studydata } = useOutletContext();

  return (
    <div className={Style.StudyMembercontainer}>
      <div className={Style.StudyMemberBox}>
        <div className={Style.StudyMemberList}>
          {studydata?.users.map((study) => (
            <div key={study.id} className={Style.MemberListItem}>
              <img alt="member" src={memberpic} style={{ width: "5vw" }}></img>
              <p>{study?.name}</p>
              <p>{study?.generation} 기</p>
              <p>{study?.classNum} 반</p>
              <p>{study?.region}</p>
              <p>공부시간 {study?.totalTime / 3600}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMember;
