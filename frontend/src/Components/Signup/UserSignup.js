import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UserSignup = () => {
  const codenum = useSelector((state) => state.codenum.userCode);
  const origincode = window.location.pathname;
  const codd = origincode.slice(13);
  useEffect(() => {
    console.log("보내기 준비");
    console.log(codd);
    axios
      .post("/api/v1/users/auth/signup", {
        code: codd,
      })
      .then((res) => {
        console.log(res);
        console.log(codenum);
      })
      .catch((err) => {
        console.log(err);
        console.log(codenum);
      });
  });
  return <div>
    {codenum}메일 인증 확인
    <script>
      alertFunction() {
        alert('인증되었습니다.')
      }
    </script>
    </div>;
};

export default UserSignup;
