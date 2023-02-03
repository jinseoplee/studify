import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Topbar.css";
import logo from "../../assets/image/logo.png";
import vector from "../../assets/image/vector.png";

const Topbar = (props) => {
  return (
    <React.Fragment>
      <div className="topbar">
        <div className="topbar_left">
          <div className="section">
            <img className="logo" src={logo} alt="logo" />
          </div>
          <div className="section">
            <NavLink
              to={props.check ? "/user/login/id" : "/study/rounge"}
              className="text_link"
            >
              스터디 라운지
            </NavLink>
          </div>
          <div className="section">
            <NavLink
              to={props.check ? "/user/login/id" : "/rank"}
              className="text_link"
            >
              랭킹
            </NavLink>
          </div>
        </div>
        <div className="section">
          <img className="vector" src={vector} alt="로그인하러가기" />
          <Link to="/user/login/id" className="text_link">
            로그인
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
