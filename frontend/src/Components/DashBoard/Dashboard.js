import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import SlidebarMain from "../Slidebar/SlidebarMain";
import StudyRecord from "./StudyRecord";
import SlidebarMain from "../Slidebar/SlidebarMain";
import MyStudy from "./MyStudy";
import axios from "axios";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";

const Dashboard = () => {
  const [myImage, setMyImage] = useState("");
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
    //이미지 통신을 다시 한번 보내기
    console.log("이미지 통신 시작");
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
        console.log("이미지 통신");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={Dashboardstyle.dashboardContainer}>
      <SlidebarMain width={400} username={userName} />
      {myImage}
      <div>
        <StudyRecord />
        <MyStudy studies={studies} />
      </div>
    </div>
  );
};

export default Dashboard;
