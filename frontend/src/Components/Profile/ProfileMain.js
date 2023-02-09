import { useEffect, useState } from "react";
import axios from "axios";

import Topbar from "../Topbar/Topbar";
import Footer from "../Footer/Footer";
import ProfileBody from "./ProfileBody";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileImg from "./ProfileImg";
import ProfileStyle from "../../Style/Profile/Profile.module.css";
import setting from "../../assets/image/setting.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileMain = () => {
  const [myImage, setMyImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userClassNum, setUserClassNum] = useState("");
  const [userGeneration, setUserGeneration] = useState("");
  const [userRegion, setUserRegion] = useState("");

  const userToken = useSelector((state) => state.token.accesstoken);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://192.168.31.155:8080/api/v1/users/detail", {
        headers: {
          "X-Auth-Token": userToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserEmail(res.data.email);
        setUserName(res.data.name);
        setUserGeneration(res.data.generation);
        setUserRegion(res.data.region);
        setUserClassNum(res.data.classNum);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://192.168.31.155:8080/api/v1/users/image", {
        headers: {
          "X-Auth-Token": userToken,
        },
        responseType: "blob",
      })
      .then((res) => {
        let objectURL = URL.createObjectURL(res.data);
        setMyImage(objectURL);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const userInfoEdit = () => {
    navigate("/userprofile/edit");
  };

  //모달 관련
  // const [openImgModal, setOpenImgModal] = useState(false);
  return (
    <div>
      <Topbar />
      <ProfileImg
      // open={openImgModal}
      // onClose={() => setOpenImgModal(false)}
      // email={userEmail}
      />
      <div className={ProfileStyle.profileBackground}>
        <img
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
          <ProfileUserInfo
            username={userName}
            usergene={userGeneration}
            userregion={userRegion}
            userclassNum={userClassNum}
          />
          <ProfileBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileMain;
