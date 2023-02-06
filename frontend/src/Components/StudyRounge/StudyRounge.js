import { useState } from "react";
import ToggleButton from "../UI/ToggleButton";
import RoungeStyle from "./StudyRounge.module.css";
import Checkbox from "../UI/Checkbox";

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
      <Checkbox props={selectSkill} />
    </div>
  );
};

export default StudyRounge;
