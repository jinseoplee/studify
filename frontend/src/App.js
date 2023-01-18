import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import OpenStudy from "./Components/OpenStudy/OpenStudy";
import Rank from "./Components/Rank/Rank";
import StartPage from "./Components/StartPage/StartPage";
import LoginID from "./Components/Login/LoginID";
import LoginPW from "./Components/Login/LoginPW";
import SignupForm from "./Components/Signup/SignupForm";

const App = () => {
  useEffect(() => {
    <Route path="/" element={<Navigate replace to="/main-page" />} />;
  }, []);
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate replace to="/main-page" />} />
        <Route path="/main-page" element={<StartPage />}></Route>
        <Route path="/openstudy" element={<OpenStudy />}></Route>
        <Route path="/rank" element={<Rank />}></Route>
        <Route path="/loginId" element={<LoginID />}></Route>
        <Route path="/loginPw" element={<LoginPW />}></Route>
        <Route path="/Signup" element={<SignupForm />}></Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
