import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import axios from "axios";

import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";
const userdummy = {
  userName: "김싸피",
  userLine: "열심히 하겠습니다",
  userSkill: ["파이썬", " 자바"],
  userBadge: ["hello"],
};

const DashboardProfile = () => {
  const [userName, setUserName] = useState("");
  const userToken = useSelector((state) => state.token.accesstoken);
  useEffect(() => {
    axios
      .get("/api/v1/users", {
        headers: {
          "X-Auth-Token": userToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // useEffect(() => {
  //   axios
  //     .get("http://192.168.31.155:8080/api/v1/users/image", {
  //       headers: {
  //         "X-Auth-Token":
  //           "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJpYXQiOjE2NzU3Mjc5NDUsImV4cCI6MTY3NTczMTU0NX0.eCEP_mSrmTDYMr8IPVvXjG5MjYqZCK2ahj_pSVPgK3E",
  //       },
  //       responseType: "blob",
  //     })
  //     .then((res) => {
  //       let objectURL = URL.createObjectURL(res.data);
  //       setMyImage(objectURL);
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
      <div className={Dashboardstyle.dashboardProfileLine}>
        {userdummy.userLine}
      </div>
      <div className={Dashboardstyle.dashboardProfileSkill}>
        <h4>유저 스킬</h4>
        <br></br>
        {userdummy.userSkill}
      </div>
      <div className={Dashboardstyle.dashboardProfileBadge}>
        <h4>나의 뱃지</h4>
        <br></br>
        {userdummy.userBadge}
      </div>
    </div>
  );
};

export default DashboardProfile;
