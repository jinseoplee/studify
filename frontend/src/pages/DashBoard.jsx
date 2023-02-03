import React from "react";
import Dashboard from "../Components/DashBoard/Dashboard";
import Footer from "../Components/Footer/Footer";
import Topbar from "../Components/Topbar/Topbar";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const logincheck = () => {
    //토큰이 있다면? 로그아웃으로 없다면 로그인으로.
  };
  const token = useSelector((state) => state.token.accesstoken);
  console.log(token);
  return (
    <>
      <Topbar logincheck={logincheck} />

      <Dashboard />

      <Footer />
    </>
  );
};

export default DashBoard;
