import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Topbarstyle from "../../Style/Topbar/Topbar.module.css";
import logo from "../../assets/image/logo.png";
import vector from "../../assets/image/vector.png";

const Topbar = () => {
  //check가 현재 access-token이 있는지 체크해서 있으면 true 없으면 false를 반환하게 만들어주어야합니다.
  const token = useSelector((state) => state.token.accesstoken);
  console.log(token.length);
  console.log(token);

  const check = () => {
    console.log("나 동작해?");
    if (token.length !== 0 ? true : false);
  };

  return (
    <React.Fragment>
      <div className={Topbarstyle.topbar}>
        <div className={Topbarstyle.topbar_left}>
          <div className={Topbarstyle.section}>
            <img className="logo" src={logo} alt="logo" />
          </div>
          <div className={Topbarstyle.section}>
            {check && (
              <NavLink to="/study/rounge" className={Topbarstyle.text_link}>
                스터디 라운지
              </NavLink>
            )}
            {!check && (
              <NavLink to="/user/login/id" className={Topbarstyle.text_link}>
                스터디 라운지
              </NavLink>
            )}
          </div>
          {check && (
            <div className={Topbarstyle.section}>
              <NavLink to="/rank" className={Topbarstyle.text_link}>
                랭킹
              </NavLink>
            </div>
          )}
          {!check && (
            <div className={Topbarstyle.section}>
              <NavLink to="/user/login/id" className={Topbarstyle.text_link}>
                랭킹
              </NavLink>
            </div>
          )}
        </div>
        <div className={Topbarstyle.section}>
          {check && (
            <>
              <img
                className={Topbarstyle.vector}
                src={vector}
                alt="로그인하러가기"
              />
              <Link to="/user/login/id" className={Topbarstyle.text_link}>
                로그인
              </Link>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
