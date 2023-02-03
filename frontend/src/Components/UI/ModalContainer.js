import React from "react";
import { createPortal } from "react-dom";
//포탈을 사용한 modal창 띄우기

const ModalContainer = ({ children }) => {
  //모달창의 자식들을 전부다 띄워줘.
  return createPortal(<>{children}</>, document.getElementById("modal"));
};

export default ModalContainer;
