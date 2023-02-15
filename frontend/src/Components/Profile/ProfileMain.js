import { useEffect, useState } from "react";
import axios from "axios";

import ProfileBody from "./ProfileBody";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileStyle from "../../Style/Profile/Profile.module.css";
import setting from "../../assets/image/setting.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileMain = () => {
  const [myImage, setMyImage] = useState("");
  let [userInfo, setUserInfo] = useState("");
  let [userBadge, setUserBadge] = useState([]);

  const userToken = useSelector((state) => state.token.accesstoken);
  const navigate = useNavigate();
  const getUserInfo = async () => {
    try {
      const response = axios.get("/api/v1/users", {
        headers: {
          "X-Auth-Token": userToken,
        },
      });
      response.then((res) => {
        console.log(res);
        setUserInfo(res.data.content);
        setUserBadge(res.data.content.badges);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getUserImg = async () => {
    try {
      const response = await axios.get("/api/v1/users/image", {
        headers: {
          "X-Auth-Token": userToken,
        },
        responseType: "blob",
      });
      response.then((res) => {
        console.log(res);
        let objectURL = URL.createObjectURL(res.data);
        setMyImage(objectURL);
        console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserInfo();
    getUserImg();
  }, []);

  const userInfoEdit = () => {
    navigate("/userprofile/edit");
  };

  return (
    <div>
      <div className={ProfileStyle.profileBackground}>
        <img
          alt="settingpng"
          src={setting}
          className={ProfileStyle.UserInfoSetting}
          onClick={userInfoEdit}
        />
        <div className={ProfileStyle.profileUpperContainer}>
          <div
            className={ProfileStyle.profilePicBox}
            // onClick={() => setOpenImgModal(true)}
          >
            <img
              src={`${myImage}`}
              className={ProfileStyle.profilePic}
              alt="userPro"
            ></img>
          </div>
          <ProfileUserInfo userinfo={userInfo} />
          <ProfileBody userbadge={userBadge} />
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
