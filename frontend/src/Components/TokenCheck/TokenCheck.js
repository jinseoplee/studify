import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const TokenCheck = () => {
  //토큰이 없으면 맨 처음으로 보내주기.
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.token.accesstoken);
  useEffect(() => {
    if (userToken === " ") {
      swal("로그인 정보가 없습니다. 시작페이지로 이동합니다.");
      navigate("/");
    }
  }, []);

  return <></>;
};

export default TokenCheck;
