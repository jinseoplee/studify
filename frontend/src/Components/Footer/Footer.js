import React from "react";
import Footerstyle from "../../Style/Footer/Footer.module.css";

const Footer = () => {
  return (
    <div className={Footerstyle.bottombar}>
      <h4>(주)방환열차</h4>
      <div>주소 : 대전광역시 유성구 덕명동 124</div>
      <div>이메일 : ssafy@ssafy.com</div>
      <div>대표전화 : 010-????-????</div>
      <div>대표이사 : 이방환</div>
      <div>사업자등록번호 : 아직 사업자가 아닙니다.</div>
    </div>
  );
};

export default Footer;
