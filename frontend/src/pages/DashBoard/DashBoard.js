import React from "react";
import Dashboard from "../../Components/DashBoard/Dashboard";
import Footer from "../../Components/Footer/Footer";
import TokenCheck from "../../Components/TokenCheck/TokenCheck";
import Topbar from "../../Components/Topbar/Topbar";

const DashBoard = () => {
  return (
    <>
      <TokenCheck />
      <Topbar />

      <Dashboard />

      <Footer />
    </>
  );
};

export default DashBoard;
