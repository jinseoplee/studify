import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/LoginStore";

import Topbarstyle from "../../Style/Topbar/Topbar.module.css";
import logo from "../../assets/image/logo.png";
import vector from "../../assets/image/vector.png";
import { useEffect } from "react";

const Topbar = () => {
  //check가 현재 access-token이 있는지 체크해서 있으면 true 없으면 false를 반환하게 만들어주어야합니다.
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.accesstoken);
  const dispatch = useDispatch();
  const [haveToken, setHaveToken] = useState(false);

  useEffect(() => {
    if (token === " ") {
      setHaveToken(false);
    } else {
      setHaveToken(true);
    }
  }, []);

  const logout = () => {
    sessionStorage.clear(); //세션스토리지에 저장된 모든 값들을 삭제해줍니다.
    dispatch(loginActions.saveToken(" ")); //빈값 보내기(리덕스의 값 비워주기.)
    if (haveToken === false) {
      setHaveToken(true);
    } else {
      setHaveToken(false);
    }
  };

  const gotoMain = () => {
    //이미지를 눌렀을때 메인페이지로 가는 것
    if (token === " ") {
      //토큰이 없으면?
      navigate("/");
    } else {
      //토큰이 있다면?
      navigate("/dashboard");
    }
  };

  return (
    <React.Fragment>
      <div className={Topbarstyle.topbar}>
        <div className={Topbarstyle.topbar_left}>
          <div className={Topbarstyle.section}>
            <img className="logo" src={logo} alt="logo" onClick={gotoMain} />
          </div>
          <div className={Topbarstyle.section}>
            {haveToken && (
              <Link to="/study/rounge" className={Topbarstyle.text_link}>
                스터디 라운지
              </Link>
            )}
            {!haveToken && (
              <Link to="/user/login" className={Topbarstyle.text_link}>
                스터디 라운지
              </Link>
            )}
          </div>
          {haveToken && (
            <div className={Topbarstyle.section}>
              <Link to="/ranking" className={Topbarstyle.text_link}>
                랭킹
              </Link>
            </div>
          )}
          {!haveToken && (
            <div className={Topbarstyle.section}>
              <Link to="/user/login" className={Topbarstyle.text_link}>
                랭킹
              </Link>
            </div>
          )}
        </div>
        <div className={Topbarstyle.section}>
          {haveToken && (
            <>
              <img className={Topbarstyle.vector} src={vector} alt="로그아웃" />
              <Link to="/" className={Topbarstyle.text_link} onClick={logout}>
                로그아웃
              </Link>
            </>
          )}
          {!haveToken && (
            <>
              <img className={Topbarstyle.vector} src={vector} alt="로그인" />
              <Link to="/user/login" className={Topbarstyle.text_link}>
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
