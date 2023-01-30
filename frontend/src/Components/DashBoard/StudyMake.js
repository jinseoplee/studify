import { useState } from "react";
import { useSelector } from "react-redux";
import SkillCheckBox from "../UI/SkillCheckBox";
import SelectCapaBox from "../UI/SelectCapaBox";
import DayCheckbox from "../UI/DayCheckbox";

// import Dashboardstyle from "./Dashboard.module.css";

const StudyMake = () => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Capacity, setCapacity] = useState("");
  const days = useSelector((state) => state.selectday.userDay);
  const skills = useSelector((state) => state.selectday.studySkill);
  const [Skill, setSkill] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  return (
    <form>
      <h2>스터디 생성</h2>
      <br></br>
      <div>
        <p>스터디명</p>
        <input type="text" value={Title} onChange={setTitle}></input>
      </div>
      <div>
        <p>기술 스택</p>
        <SkillCheckBox />
        <p>{skills}</p>
      </div>
      <div>
        <p>스터디 정원</p>
        <SelectCapaBox />
      </div>
      <div>
        <p>스터디 요일</p>
        <DayCheckbox />
        <p>{days}</p>
      </div>
      <div>
        <p>스터디 소개글</p>
        <input
          type="text"
          value={Description}
          onChange={setDescription}
        ></input>
      </div>
      <div>
        <p>공개 설정</p>
        <button>생성하기</button>
      </div>
    </form>
  );
};

export default StudyMake;
