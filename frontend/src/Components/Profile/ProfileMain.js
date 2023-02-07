import { useEffect, useState } from "react";
import axios from "axios";

import Topbar from "../Topbar/Topbar";
import Footer from "../Footer/Footer";
import ProfileBody from "./ProfileBody";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileStyle from "../../Style/Profile/Profile.module.css";

const ProfileMain = () => {
  const [myImage, setMyImage] = useState("");
  useEffect(() => {
    axios
      .get("http://192.168.31.155:8080/api/v1/users/image", {
        headers: {
          "X-Auth-Token":
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJpYXQiOjE2NzU3Mjc5NDUsImV4cCI6MTY3NTczMTU0NX0.eCEP_mSrmTDYMr8IPVvXjG5MjYqZCK2ahj_pSVPgK3E",
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
  return (
    <div>
      <Topbar />
      <div className={ProfileStyle.profileBackground}>
        <div className={ProfileStyle.profileUpperContainer}>
          <div className={ProfileStyle.profilePicBox}>
            <img src={`${myImage}`} className={ProfileStyle.profilePic}></img>
          </div>
          <ProfileUserInfo />
          <ProfileBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileMain;
