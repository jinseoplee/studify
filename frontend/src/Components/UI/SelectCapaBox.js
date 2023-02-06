import { useDispatch } from "react-redux";
import { selectdayActions } from "../../store/StudyStore";
import SelectStyle from "../../Style/UI/Selectbox.module.css";

const SelectCapaBox = () => {
  const dispatch = useDispatch();
  const capaChange = (e) => {
    dispatch(selectdayActions.changecapa(e.target.value));
    // console.log(e.target.value);
  };
  return (
    <select onChange={capaChange} className={SelectStyle.CapaSelectbox}>
      <option key="3" value="3">
        3
      </option>
      <option key="4" value="4">
        4
      </option>
      <option key="5" value="5">
        5
      </option>
      <option key="6" value="6">
        6
      </option>
      <option key="7" value="7">
        7
      </option>
      <option key="8" value="8">
        8
      </option>
      <option key="9" value="9">
        9
      </option>
      <option key="10" value="10">
        10
      </option>
    </select>
  );
};

export default SelectCapaBox;
