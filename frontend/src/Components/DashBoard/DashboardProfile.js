import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import axios from "axios";

import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";

const DashboardProfile = () => {
  const [userName, setUserName] = useState("");
  const [myImage, setMyImage] = useState("");
  const userToken = useSelector((state) => state.token.accesstoken);
  let [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    axios
      .get("api/v1/users", {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUserInfo(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("api/v1/users/image", {
        headers: {
          "X-Auth-Token": userToken,
        },
        responseType: "blob",
      })
      .then((res) => {
        let objectURL = URL.createObjectURL(res.data);
        setMyImage(objectURL);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={Dashboardstyle.dashboardProfileContainer}>
      <Link to="/userprofile">
        <div className={Dashboardstyle.dashboardProfilePicbox}>
          <img
            src={`${myImage}`}
            alt="profileimg"
            className={Dashboardstyle.dashboardProfilePic}
          ></img>
        </div>
      </Link>
      <div className={Dashboardstyle.dashboardProfileName}>{userInfo.name}</div>
      <div className={Dashboardstyle.dashboardProfileLine}>
        {userInfo.generation}기
      </div>
      <div className={Dashboardstyle.dashboardProfileLine}>
        {userInfo.region} {userInfo.classNum}반
      </div>
      <div className={Dashboardstyle.dashboardProfileLine}></div>
      <div className={Dashboardstyle.dashboardProfileSkill}>
        <h4>공부중!</h4>

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
