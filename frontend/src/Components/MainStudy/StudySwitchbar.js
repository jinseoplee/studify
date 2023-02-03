import { Link } from "react-router-dom";
import SwitchStyle from "./Switchbar.module.css";

const StudySwitchbar = ({ id }) => {
  return (
    <div className={SwitchStyle.studyMenu}>
      <Link to="info" className={SwitchStyle.studyMenuText}>
        소개
      </Link>
      <Link to="rule" className={SwitchStyle.studyMenuText}>
        이용수칙
      </Link>

      <Link to="record" className={SwitchStyle.studyMenuText}>
        활동 기록
      </Link>

      <Link to="member" className={SwitchStyle.studyMenuText}>
        스터디 멤버
      </Link>
    </div>
  );
};

export default StudySwitchbar;
