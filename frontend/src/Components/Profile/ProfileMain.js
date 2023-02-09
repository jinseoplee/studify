import { useEffect, useState } from "react";
import axios from "axios";

import Topbar from "../Topbar/Topbar";
import Footer from "../Footer/Footer";
import ProfileBody from "./ProfileBody";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileImg from "./ProfileImg";
import ProfileStyle from "../../Style/Profile/Profile.module.css";

const ProfileMain = () => {
  const [myImage, setMyImage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userGeneration, setUserGeneration] = useState("");
  const [userRegion, setUserRegion] = useState("");

  useEffect(() => {
    axios
      .get("http://192.168.31.155:8080/api/v1/users/detail", {
        headers: {
          "X-Auth-Token":
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJpYXQiOjE2NzU4NDEzOTksImV4cCI6MTY3NTg0NDk5OX0.eLiBTDxwnO5F4bYbSZUL1I5ctHDRYYZTneiLKg2TJ6U",
        },
      })
      .then((res) => {
        console.log(res.data.content);
        setUserEmail(res.data.content.email);
        setUserName(res.data.content.name);
        setUserGeneration(res.data.content.generation);
        setUserRegion(res.data.content.region);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://192.168.31.155:8080/api/v1/users/image", {
        headers: {
          "X-Auth-Token":
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJpYXQiOjE2NzU4NDEzOTksImV4cCI6MTY3NTg0NDk5OX0.eLiBTDxwnO5F4bYbSZUL1I5ctHDRYYZTneiLKg2TJ6U",
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

  //모달 관련
  const [openImgModal, setOpenImgModal] = useState(false);

  return (
    <div>
      <Topbar />
      <ProfileImg
        open={openImgModal}
        onClose={() => setOpenImgModal(false)}
        email={userEmail}
      />
      <div className={ProfileStyle.profileBackground}>
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
          <ProfileUserInfo
            username={userName}
            usergene={userGeneration}
            userregion={userRegion}
          />
          <ProfileBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileMain;
