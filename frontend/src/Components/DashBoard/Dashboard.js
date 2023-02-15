import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userChangeActions } from "../../store/UserStore";
import StudyRecord from "./StudyRecord";
import SlidebarMain from "../Slidebar/SlidebarMain";
import MyStudy from "./MyStudy";
import axios from "axios";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";

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
      })
      .then((res) => {
        console.log(res.data.content.region);
        // console.log(res.data.region);
        sessionStorage.setItem("email", res.data.content.email);
        dispatch(userChangeActions.saveUserRegion(res.data.content.region));
        setMyStudies(res.data.content.studies);
        setUserData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(res);
      setUserData(res.data.content);
      setMyStudies(res.data.content.studies);
      sessionStorage.setItem("email", res.data.content.email);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userDataHandler();
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
