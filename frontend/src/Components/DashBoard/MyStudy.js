import { Link } from "react-router-dom";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";
import makestudy from "../../assets/image/plus.png";

const MyStudy = () => {
  return (
    <div className={Dashboardstyle.MyStudycontainer}>
      <h3>나의 스터디</h3>
      <div className={Dashboardstyle.MyStudybox}>
        <Link to="/study/newstudy" className={Dashboardstyle.MyStudyMake}>
          <img
            className={Dashboardstyle.MyStudyMakeLogo}
            src={makestudy}
            alt="makestudy"
          />
        </Link>
        <div className={Dashboardstyle.MyStudyList}>스터디 리스트</div>
      </div>
    </div>
  );
};

export default MyStudy;
