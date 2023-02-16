import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StudyRecord from "./StudyRecord";
import SlidebarMain from "../Slidebar/SlidebarMain";
import MyStudy from "./MyStudy";
import axios from "axios";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";
import { userChangeActions } from "../../store/UserStore";

const Dashboard = () => {
  const userToken = useSelector((state) => state.token.accesstoken);
  const [userData, setUserData] = useState("");
  let [studies, setMyStudies] = useState([]);
  const dispatch = useDispatch();

  const userDataHandler = async () => {
    try {
      const res = await axios.get("/api/v1/users", {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      });
      dispatch(userChangeActions.saveUserRegion(res.data.content.region));
      dispatch(userChangeActions.saveUserGeneration(res.data.content.generation));
      dispatch(userChangeActions.saveUserclassNum(res.data.content.classNum));
      setUserData(res.data.content);
      setMyStudies(res.data.content.studies);
      sessionStorage.setItem("email", res.data.content.email);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userDataHandler();
    localStorage.clear();
  }, []);
  return (
    <div className={Dashboardstyle.dashboardContainer}>
      <SlidebarMain width={300} />
      <div>
        <StudyRecord userData={userData} />
        <MyStudy studies={studies} />
      </div>
    </div>
  );
};

export default Dashboard;
