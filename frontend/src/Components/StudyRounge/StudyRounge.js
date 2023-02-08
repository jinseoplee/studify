import { useState } from "react";
// import ToggleButton from "../UI/ToggleButton";
import RoungeStyle from "../../Style/StudyRounge/StudyRounge.module.css";
import SkillCheckBox from "../UI/SkillCheckBox";

const StudyRounge = () => {
  const selectSkill = [
    { id: "python", title: "Python" },
    { id: "java", title: "Java" },
    { id: "jacascript", title: "Javascript" },
    { id: "cpp", title: "C++" },
    { id: "vue", title: "Vue" },
    { id: "react", title: "React" },
  ];
  return (
    <div>
      <SkillCheckBox props={selectSkill} />
    </div>
  );
};

export default StudyRounge;
