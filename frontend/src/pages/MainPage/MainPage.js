import { Outlet } from "react-router-dom";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";
import StartPage from "../../Components/StartPage/StartPage";

const MainPage = () => {
  return (
    <>
      <Topbar />
      <StartPage />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainPage;
