import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StudyRecord from "./StudyRecord";
import SlidebarMain from "../Slidebar/SlidebarMain";
import MyStudy from "./MyStudy";
import axios from "axios";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";

const Dashboard = () => {
  const userToken = useSelector((state) => state.token.accesstoken);
  let [studies, setMyStudies] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/users", {
        headers: {
          "X-Auth-Token": userToken,
        },
      })
      .then((res) => {
        console.log(res.data.content);
        setMyStudies(res.data.content.studies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={Dashboardstyle.dashboardContainer}>
      <SlidebarMain width={400} />
      <div>
        <StudyRecord />
        <MyStudy studies={studies} />
      </div>
    </div>
  );
};

export default Dashboard;
