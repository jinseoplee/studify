import axios from "axios";
import { useState } from "react";

import Modalstyle from "./ModalSignup.module.css";
// import axios from "axios";

const ModalStudyForm = ({ open, onClose }) => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Day, setDay] = useState([]);
  const StudySubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("", {
        title: Title,
        description: Description,
        day: Day,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  if (!open) return null;
  return (
    <form className={Modalstyle.modalcontain}>
      <div className={Modalstyle.modalStudyBody}>
        <div className={Modalstyle.modalStudyForm}>
          <h2 onClick={onClose}>스터디 생성</h2>
          <br></br>
          <label>스터디명</label>
          <input type="text" value={Title} onChange={setTitle}></input>
          <label>기술 스택</label>
          <label>스터디 소개글</label>
          <input
            type="text"
            value={Description}
            onChange={setDescription}
          ></input>
          <br></br>
          <button className={Modalstyle.modalBtn} onClick={StudySubmitHandler}>
            가입
          </button>
        </div>
        <div></div>
      </div>
    </form>
  );
};

export default ModalStudyForm;
