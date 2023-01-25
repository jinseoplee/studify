import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar/Topbar";
import Footer from "../Components/Footer/Footer";
import StartPage from "../Components/StartPage/StartPage";

const MainPage = () => {
  const navigate = useNavigate();
  //회원가입 페이지로 이동시켜주는 힘수입니다.
  const check = () => {
    if (localStorage.getItem.length === 0 ? true : false);
  };
  const goSignup = () => {
    navigate("/user/signup");
  };
  return (
    <>
      <Topbar check={check} />
      <StartPage goSignup={goSignup} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainPage;
