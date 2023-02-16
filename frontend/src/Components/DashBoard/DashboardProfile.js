import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/LoginStore";
import { Link } from "react-router-dom";
import axios from "axios";

import babypic from "../../assets/image/baby.png";
import birdfirst from "../../assets/image/bird1level.png";
import firts from "../../assets/image/badge_first.png";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";

const DashboardProfile = () => {
  const dispatch = useDispatch();
  const [myImage, setMyImage] = useState("");
  const userToken = useSelector((state) => state.token.accesstoken);
  let [userInfo, setUserInfo] = useState("");
  const [userStudies, setUserStudies] = useState([]);
  let [userBadge, setUserBadge] = useState([]);
  let myskills = [];
  const [userSSkill, setUserSSkil] = useState([]);

  const userSkillHandler = () => {
    if (userStudies) {
      for (let item of userStudies) {
        for (let skill of item.category) {
          myskills.push(skill.name);
        }
      }
      setUserSSkil(Array.from(new Set(myskills)));
    }
  };
  const userDataHandler = async () => {
    try {
      const res = await axios.get("/api/v1/users", {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      });
      console.log(res);
      dispatch(loginActions.saveName(res.data.content.name));
      setUserInfo(res.data.content);
      setUserBadge(res.data.content.badges);
      setUserStudies(res.data.content.studies);
      userSkillHandler();
    } catch (err) {
      console.log(err);
    }
  };

  const userImageHandler = async () => {
    try {
      const res = await axios.get("api/v1/users/image", {
        headers: {
          "X-Auth-Token": userToken,
        },
        responseType: "blob",
      });
      console.log(res);
      let objectURL = URL.createObjectURL(res.data);
      setMyImage(objectURL);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userDataHandler();
    userImageHandler();
    userSkillHandler();
    setUserSSkil(Array.from(new Set(myskills)));
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
      <div className={Dashboardstyle.dashboardProfileLine}>
        {userInfo.generation}기 {userInfo.region} {userInfo.classNum}반
      </div>
      <div className={Dashboardstyle.dashboardProfileName}>{userInfo.name}</div>
      <div className={Dashboardstyle.dashboardProfileLine}></div>
      {/* <div className={Dashboardstyle.dashboardProfileSkill}>
        <h4>현재</h4>
        <div className={Dashboardstyle.flexbox}>
          {userSSkill &&
            userSSkill.map((el) => (
              <div key={el}>
                <p style={{ marginTop: "-10px" }}>{el}</p>
              </div>
            ))}
        </div>
        <p style={{ marginTop: "15px", fontWeight: "500" }}>
          를 공부하고 있습니다
        </p>

        <br></br>
      </div> */}
      <div className={Dashboardstyle.dashboardProfileBadge}>
        <h4>나의 뱃지</h4>
        <div className={Dashboardstyle.DashboardBadgeBox}>
          {userBadge.map((el) => (
            <div key={el.id}>
              {el.name === "신입" && (
                <img
                  alt="baby"
                  src={babypic}
                  className={Dashboardstyle.DashboardMyBadge}
                ></img>
              )}
              {el.name === "출석 1단계" && (
                <img
                  alt="bird1"
                  src={birdfirst}
                  className={Dashboardstyle.DashboardMyBadge}
                ></img>
              )}
              {el.name === "1st" && (
                <img
                  alt="time1"
                  src={firts}
                  className={Dashboardstyle.DashboardMyBadge}
                ></img>
              )}
            </div>
          ))}
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default DashboardProfile;
