import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import ProfileBody from "./ProfileBody";
import ProfileImg from "./ProfileImg";
import ProfileStyle from "../../Style/Profile/Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userToken = useSelector((state) => state.token.accesstoken);
  const generation = useSelector((state) => state.userinfo.userGeneration);
  const Region = useSelector((state) => state.userinfo.userRegion);
  const [myImage, setMyImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [openImgModal, setOpenImgModal] = useState(false);
  const [classNum, setClassNum] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/users", {
        headers: {
          "X-Auth-Token": userToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserEmail(res.data.email);
        setUserName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/api/v1/users/image", {
        headers: {
          "X-Auth-Token": userToken,
        },
        responseType: "blob",
      })
      .then((res) => {
        let objectURL = URL.createObjectURL(res.data);
        setMyImage(objectURL);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeUserInfo = () => {
    axios
      .put("/api/v1/users",
        {
          classNum: classNum,
          name: userName,
        },
        {
          headers: {
            "X-AUTH-TOKEN": userToken,
          }
        },
        setTimeout(() => {
          navigate("/mainpage")
        }, 500)
    )
      .catch((err) => {
        console.log(err);
      });
  };

  const editComplete = () => {
    changeUserInfo();
  };

  const classChange = (e) => {
    setClassNum(e.target.value);
  };

  const nameChange = (e) => {
    setUserName(e.target.value);
    console.log(userName);
  };

  return (
    <>
      <ProfileImg
        open={openImgModal}
        onClose={() => setOpenImgModal(false)}
        email={userEmail}
      />
      <div className={ProfileStyle.profileBackground}>
        <button onClick={editComplete} className={ProfileStyle.UserInfoCheck}>
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
          <form onSubmit={changeUserInfo} className={ProfileStyle.formInput}>
            <div>
            이름 : <input type="text" value={userName} onChange={nameChange}
              className={ProfileStyle.Input} />
            </div>
            <div>
              반 :
              <select onChange={classChange} className={ProfileStyle.InputSelectBox}>
                <option key="1" value="1">
                  1
                </option>
                <option key="2" value="2">
                  2
                </option>
                <option key="3" value="3">
                  3
                </option>
                <option key="4" value="4">
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
          <div className={ProfileStyle.userInfo}>
            <div>기수 : {generation} 기</div>
            <div>지역 : {Region}</div>
          </div>
          <ProfileBody />
        </div>
      </div>
    </>
  );
};

export default Profile;
