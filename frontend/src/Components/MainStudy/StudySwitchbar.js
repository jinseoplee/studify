import { NavLink } from "react-router-dom";
import SwitchStyle from "../../Style/MainStudy/Switchbar.module.css";

const StudySwitchbar = ({ id }) => {
  return (
    <div className={SwitchStyle.studyMenu}>
      <NavLink to="info" className={SwitchStyle.studyMenuText}>
        소개
      </NavLink>
      <NavLink to="rule" className={SwitchStyle.studyMenuText}>
        이용수칙
      </NavLink>

      <NavLink to="record" className={SwitchStyle.studyMenuText}>
        활동 기록
      </NavLink>

      <NavLink to="member" className={SwitchStyle.studyMenuText}>
        스터디 멤버
      </NavLink>
    </div>
  );
};

export default StudySwitchbar;
