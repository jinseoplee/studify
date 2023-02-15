import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Topbar from "../Topbar/Topbar";
import ProfileBody from "./ProfileBody";
import ProfileImg from "./ProfileImg";
import ProfileStyle from "../../Style/Profile/Profile.module.css";

const Profile = () => {
  const [myImage, setMyImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userGeneration, setUserGeneration] = useState("");
  const [userRegion, setUserRegion] = useState("");
  const [openImgModal, setOpenImgModal] = useState(false);
  const [classNum, setClassNum] = useState("");
  const userToken = useSelector((state) => state.token.accesstoken);

  const getUserInfo = async () => {
    try {
      const response = axios.get("/api/v1/users", {
        headers: {
          "X-Auth-Token": userToken,
        },
      });
      response.then((res) => {
        console.log(res);
        setUserEmail(res.data.content.email);
        setUserName(res.data.content.name);
        setUserGeneration(res.data.content.generation);
        setUserRegion(res.data.content.region);
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

  const chageUserInfo = () => {
    axios
      .put("/api/v1/users/pass", {
        classNum: classNum,
        name: userName,
        region: userRegion,
        generation: userGeneration,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editComplete = () => {
    chageUserInfo();
  };

  const classChange = (e) => {
    setClassNum(e.target.value);
  };

  const nameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <>
      <Topbar />
      <ProfileImg
        open={openImgModal}
        onClose={() => setOpenImgModal(false)}
        email={userEmail}
      />
      <div className={ProfileStyle.profileBackground}>
        <button onClick={editComplete} className={ProfileStyle.UserInfoSetting}>
          수정완료
        </button>
        <div className={ProfileStyle.profileUpperContainer}>
          <div
            className={ProfileStyle.profilePicBox}
            onClick={() => setOpenImgModal(true)}
          >
            <img
              src={`${myImage}`}
              className={ProfileStyle.profilePic}
              alt="userPro"
            ></img>
          </div>
          <form onSubmit={chageUserInfo}>
            이름 : <input type="text" value={userName} onChange={nameChange} />
            <div>
              반 :
              <select onChange={classChange}>
                <option key="1" value="1">
                  1
                </option>
                <option key="2" value="2">
                  2
                </option>
                <option key="3" value="3">
                  3
                </option>
                <option key="4" value="5">
                  4
                </option>
                <option key="5" value="5">
                  5
                </option>
                <option key="6" value="6">
                  6
                </option>
                <option key="7" value="7">
                  7
                </option>
                <option key="8" value="8">
                  8
                </option>
                <option key="9" value="9">
                  9
                </option>
                <option key="10" value="10">
                  10
                </option>
                <option key="11" value="11">
                  11
                </option>
                <option key="12" value="12">
                  12
                </option>
                <option key="13" value="3">
                  13
                </option>
                <option key="14" value="5">
                  14
                </option>
                <option key="15" value="15">
                  15
                </option>
                <option key="16" value="16">
                  16
                </option>
                <option key="17" value="17">
                  17
                </option>
                <option key="18" value="18">
                  18
                </option>
                <option key="19" value="19">
                  19
                </option>
                <option key="20" value="20">
                  20
                </option>
              </select>
            </div>
          </form>
          <div>기수 : {userGeneration}</div>
          <div>지역 : {userRegion}</div>
          <ProfileBody />
        </div>
      </div>
    </>
  );
};

export default Profile;
