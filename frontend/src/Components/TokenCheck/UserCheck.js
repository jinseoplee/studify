import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import TokenCheck from "./TokenCheck";

const UserCheck = () => {
  const [tokencookies] = useCookies(["userToken"]);
  const [studyIdcookies] = useCookies(["studyId"]);
  const studyId = localStorage.getItem("studyId");
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  //토큰을 이용하여 해당토큰의 이메일을 먼저 가져온 후에
  //그 이메일이 가지고 있는 스터디 목록의 아이디를 가져와서
  //내가 들어가려는 비디오룸의 스터디 아이디가 있는지 체크하고 없으면 mainpage로 이동.
  useEffect(async () => {
    console.log(userToken);
    console.log(studyId);
    try {
      const response = await axios.post(
        `/api/v1/studies/check`,
        {
          studyId: studyId,
        },
        {
          headers: {
            "X-AUTH-TOKEN": userToken,
          },
        }
      );
      console.log(response);
      navigate("/videoroom");
    } catch (err) {
      console.log(err);
      swal(err.response.data.message);
      if (userToken === " ") {
        // navigate("/");
        setTimeout(() => {
          swal("로그인 정보가 없습니다. 시작페이지로 이동합니다.");
        }, 50000000);
      } else {
        navigate("/mainpage");
        setTimeout(() => {
          window.close();
        }, 1000000000);
      }
    }
  }, []);

  return <></>;
};
export default UserCheck;
