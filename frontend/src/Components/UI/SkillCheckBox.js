import { useState } from "react";
import { useDispatch } from "react-redux";
import CheckStyle from "../../Style/UI/Checkbox.module.css";
import { selectdayActions } from "../../store/StudyStore";

const SkillCheckBox = () => {
  const dispatch = useDispatch();
  const data = [
    { id: 0, skill: "python", name: "Python" },
    { id: 1, skill: "java", name: "Java" },
    { id: 2, skill: "javascript", name: "JavaScript" },
    { id: 3, skill: "cpp", name: "C++" },
  ];
  const [checkSkill, setCheckSkill] = useState([]);
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckSkill((prev) => [...prev, id]);
    } else {
      setCheckSkill(checkSkill.filter((el) => el !== id));
    }
  };
  dispatch(selectdayActions.changeskill(checkSkill));
  return (
    <div className={CheckStyle.StudyMakeFlex}>
      {data.map((data, key) => (
        <div key={key} className={CheckStyle.StudyMakeFlex}>
          <input
            type="checkbox"
            name={`select-${data.id}`}
            onChange={(e) => handleSingleCheck(e.target.checked, data.skill)}
            checked={checkSkill.includes(data.skill) ? true : false}
            // id="chk_top"
            id={data.skill}
          ></input>
          <label for={data.skill}>{data.name}</label>
        </div>
      ))}
    </div>
  );
};

export default SkillCheckBox;
