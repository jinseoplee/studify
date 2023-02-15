import React from "react";
import Dashboard from "../../Components/DashBoard/Dashboard";
import TokenCheck from "../../Components/TokenCheck/TokenCheck";
import Topbar from "../../Components/Topbar/Topbar";

const DashBoard = () => {
  return (
    <>
      <TokenCheck />
      <Topbar />

      <Dashboard />
    </>
  );
};

export default DashBoard;
