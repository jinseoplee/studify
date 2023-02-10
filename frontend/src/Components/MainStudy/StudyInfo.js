import { useSelector } from "react-redux";
import StudyStyle from "../../Style/MainStudy/StudyDetail.module.css";

const StudyInfo = ({ study }) => {
  const studynum = useSelector((state) => state.userStudyInfo.studycapa);
  const studyday = useSelector((state) => state.userStudyInfo.days);
  const studyskill = useSelector((state) => state.userStudyInfo.skills);
  const studydes = useSelector((state) => state.userStudyInfo.description);
  return (
    <div>
      <div className={StudyStyle.studyInfoContainer}>
        <div className={StudyStyle.studyContent}>
          <p>인 원 : {studynum} </p>
          <br></br>
          <br></br>
          <p>기술 스택 : {studyskill} </p>
        </div>
        <div className={StudyStyle.studyContent}>
          <p>일 정 : {studyday}</p>
          <br></br>
          <br></br>
          <p>스터디장 : </p>
        </div>
      </div>
      <hr className={StudyStyle.studyHr}></hr>
      <div>
        <p className={StudyStyle.studyContentTitle}>공지사항</p>
        <p>{study}</p>
      </div>
    </div>
  );
};

export default StudyInfo;
