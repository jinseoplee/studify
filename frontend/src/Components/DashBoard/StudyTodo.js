import ModalContainer from "../UI/ModalContainer";
import DashModal from "./Dashboard.module.css";
import Dashboardstyle from "./Dashboard.module.css";

const StudyTodo = ({ open, onClose }) => {
  const days = { 월: "자바스터디", 화: "자바스터디" };
  // "월",
  // "화",
  // "수",
  // "목",
  // "금",
  // "토",
  // "일",

  const dayyy = ["월", "화"];
  const dayjson = JSON.stringify(days);
  console.log(days);
  console.log(dayjson);
  if (!open) return null;
  return (
    <ModalContainer>
      <div className={DashModal.RecordModalContainer} onClick={onClose}>
        <div className={DashModal.RecordModalBody}>
          <p onClick={onClose}>x</p>
          <div>{days.월}</div>
          <div>{days.화}</div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default StudyTodo;
