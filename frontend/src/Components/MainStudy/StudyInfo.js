import { useSelector } from "react-redux";
import StudyStyle from "../../Style/MainStudy/StudyDetail.module.css";

const StudyInfo = () => {
  const studynum = useSelector((state) => state.userStudyInfo.studycapa);
  const studyday = useSelector((state) => state.userStudyInfo.days);
  const studyskill = useSelector((state) => state.userStudyInfo.skills);
  const studydes = useSelector((state) => state.userStudyInfo.description);
  return (
    <div>
      <div className={StudyStyle.studyInfoContainer}>
        <p>
          <span>인 원 : {studynum} </span>
          <span>일 정 : {studyday}</span>
        </p>
        <p>
          <span>기술 스택 : {studyskill} </span>
          <span>스터디장 : </span>
        </p>
      </div>
      <hr className={StudyStyle.studyHr}></hr>
      <div>
        <p>소개글</p>
        <p>{studydes}</p>
      </div>
    </div>
  );
};

export default StudyInfo;
