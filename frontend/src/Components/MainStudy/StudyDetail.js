import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import StudySwitchbar from "./StudySwitchbar";
import StudyStyle from "../../Style/MainStudy/StudyDetail.module.css";

const StudyDetail = () => {
  const studyId = useSelector((state) => state.userStudyInfo.studyId);
  const studyname = useSelector((state) => state.userStudyInfo.studyname);
  //   const navigate = useNavigate();
  let url = "https://www.naver.com/"
  const joinSession = () => { //이것을 이용해서 오픈비두 창으로 보내주면 될것같은데?
    window.open(url, "_blank", "noopener noreferrer");
  }
  return (
    <>
      <div className={StudyStyle.StudyDetailContainer}>
        <div className={StudyStyle.StudyDetailback}>
          <p className={StudyStyle.StudyDetailName}>{studyname}</p>
          <button className={StudyStyle.StudyBtn} onClick={joinSession}>참여하기</button>
        </div>
        <div className={StudyStyle.studySwitchbarContainer}>
          <StudySwitchbar id={studyId} />
          <hr className={StudyStyle.studyHr}></hr>
        </div>
        <div className={StudyStyle.studyDetailInside}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default StudyDetail;
