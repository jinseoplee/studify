import Modalstyle from "../../Style/UI/ModalSignup.module.css";
import { useNavigate } from "react-router-dom";
import ModalContainer from "./ModalContainer";
import axios from "axios";

const ModalSignup = ({ open, onClose, userEmail }) => {
  const navigate = useNavigate();
  if (!open) return null;
  const getUserInfoHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/v1/users/${userEmail}`);
      navigate("/");
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ModalContainer>
      <div onClick={onClose} className={Modalstyle.modalcontain}>
        <div className={Modalstyle.modalBody}>
          <p className={Modalstyle.modalCloseBtn}>X</p>
          <p>인증 메일이 발송되었습니다</p>
          <div>
            <button className={Modalstyle.modalBtn}>이메일 재발송</button>
          </div>
          <div>
            <button
              className={Modalstyle.modalBtn}
              onClick={getUserInfoHandler}
            >
              인증하기
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ModalSignup;
