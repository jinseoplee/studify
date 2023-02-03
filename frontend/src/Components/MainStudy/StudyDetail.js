import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Topbar from "../Topbar/Topbar";
import StudySwitchbar from "./StudySwitchbar";
import StudyStyle from "./StudyDetail.module.css";

const StudyDetail = () => {
  const studyId = useSelector((state) => state.userStudyInfo.studyId);
  const studyname = useSelector((state) => state.userStudyInfo.studyname);
  //   const navigate = useNavigate();
  return (
    <div>
      <div>
        <Topbar />
      </div>
      <div className={StudyStyle.StudyDetailContainer}>
        <div className={StudyStyle.StudyDetailback}>
          <p className={StudyStyle.StudyDetailName}>{studyname}</p>
          <button className={StudyStyle.StudyBtn}>참여하기</button>
        </div>
        <div className={StudyStyle.studySwitchbarContainer}>
          <StudySwitchbar id={studyId} />
          <hr className={StudyStyle.studyHr}></hr>
        </div>
        <div className={StudyStyle.studyDetailInside}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudyDetail;
