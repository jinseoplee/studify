import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import axios from "axios";

import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";

const DashboardProfile = () => {
  const [userName, setUserName] = useState("");
  const [studies, setMyStudies] = useState(null);
  const userToken = useSelector((state) => state.token.accesstoken);

  // useEffect(() => {
  //   axios
  //     .get("api/v1/users", {
  //       headers: {
  //         "X-Auth-Token": `${userToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.content);
  //       console.log(res.data.content.studies);
  //       setMyStudies(res.data.content.studies);
  //       setUserName(res.data.name);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className={Dashboardstyle.dashboardProfileContainer}>
      <Link to="/userprofile">
        <div className={Dashboardstyle.dashboardProfilePic}>
          <img
            src={``}
            style={{ width: "192px", height: "192px" }}
            alt="profileimg"
          ></img>
        </div>
      </Link>
      <div className={Dashboardstyle.dashboardProfileName}>{userName}</div>
      <div className={Dashboardstyle.dashboardProfileFollow}>팔로잉</div>
      <div className={Dashboardstyle.dashboardProfileLine}></div>
      <div className={Dashboardstyle.dashboardProfileSkill}>
        <h4>유저 스킬</h4>
        <br></br>
      </div>
      <div className={Dashboardstyle.dashboardProfileBadge}>
        <h4>나의 뱃지</h4>
        <br></br>
      </div>
    </div>
  );
};

export default DashboardProfile;
