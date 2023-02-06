import SlidebarMain from "../Slidebar/SlidebarMain";
import StudyRecord from "./StudyRecord";
import MyStudy from "./MyStudy";
import Dashboardstyle from "../../Style/Dashboard/Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={Dashboardstyle.dashboardContainer}>
      <SlidebarMain width={400} />
      <div>
        <StudyRecord />
        <MyStudy />
      </div>
    </div>
  );
};

export default Dashboard;
