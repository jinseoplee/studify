import { Outlet } from "react-router-dom";
import Topbar from "../../Components/Topbar/Topbar";
import StartPage from "../../Components/StartPage/StartPage";
import TokenRemove from "../../Components/TokenCheck/TokenRemove";

const MainPage = () => {
  return (
    <>
      <TokenRemove />
      <Topbar />
      <StartPage />
      <Outlet />
    </>
  );
};

export default MainPage;
