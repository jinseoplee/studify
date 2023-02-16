import { Outlet } from "react-router-dom";
import Topbar from "../../Components/Topbar/Topbar";
import StartPage from "../../Components/StartPage/StartPage";

const MainPage = () => {
  return (
    <>
      <Topbar />
      <StartPage />
      <Outlet />
    </>
  );
};

export default MainPage;
