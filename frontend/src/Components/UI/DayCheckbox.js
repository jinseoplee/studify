import { useState } from "react";
import { useDispatch } from "react-redux";
import CheckStyle from "./Checkbox.module.css";
import { selectdayActions } from "../../store/StudyStore";

const DayCheckbox = () => {
  const dispatch = useDispatch();
  const data = [
    { id: 0, title: "월" },
    { id: 1, title: "화" },
    { id: 2, title: "수" },
    { id: 3, title: "목" },
    { id: 4, title: "금" },
    { id: 5, title: "토" },
    { id: 6, title: "일" },
  ];
  const [checkItems, setCheckItems] = useState([]);
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
  dispatch(selectdayActions.changeday(checkItems));
  return (
    <div className={CheckStyle.StudyMakeFlex}>
      {data?.map((data, key) => (
        <div key={key} className={CheckStyle.StudyMakeFlex}>
          <input
            type="checkbox"
            name={`select-${data.id}`}
            onChange={(e) => handleSingleCheck(e.target.checked, data.title)}
            checked={checkItems.includes(data.title) ? true : false}
          ></input>
          <p>{data.title}</p>
        </div>
      ))}
    </div>
  );
};

export default DayCheckbox;
