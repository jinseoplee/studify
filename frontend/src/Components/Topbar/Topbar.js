import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";
import logo from "../../assets/image/logo.png";
import vector from "../../assets/image/vector.png";

const Topbar = () => {
  return (
    <React.Fragment>
      <div className="topbar">
        <div class="topbar_left">
          <div className="section">
            <img className="logo" src={logo} alt="logo" />
          </div>
          <div className="section">
            <Link to="/openstudy" className="text_link">
              오픈스터디
            </Link>
          </div>
          <div className="section">
            <Link to="/rank" className="text_link">
              랭킹
            </Link>
          </div>
        </div>
        <div className="section">
          <img className="vector" src={vector} alt="로그인하러가기" />
          <span>로그인</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
