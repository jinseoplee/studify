import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StudyRecord from "./StudyRecord";
import SlidebarMain from "../Slidebar/SlidebarMain";
import MyStudy from "./MyStudy";
import AuthTimer from "../Signup/AuthTimer";
import axios from "axios";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";

const Dashboard = () => {
  const userToken = useSelector((state) => state.token.accesstoken);
  const [userData, setUserData] = useState("");
  let [studies, setMyStudies] = useState([]);

  useEffect(() => {
    axios
      .get("api/v1/users", {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.content);
        sessionStorage.setItem("email", res.data.content.email);
        setMyStudies(res.data.content.studies);
        setUserData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={Dashboardstyle.dashboardContainer}>
      <AuthTimer />
      <SlidebarMain width={300} />
      <div>
        <StudyRecord userData={userData} />
        <MyStudy studies={studies} />
      </div>
    </div>
  );
};

export default Dashboard;
