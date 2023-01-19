import "./Modal.module.css";
import ModalContainer from "./ModalContainer";

const ModalSignup = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <ModalContainer>
      <div onClick={onClose} className="modalContainer">
        <div className="modalBody">
          <p onClick={onClose} className="modalCloseBtn">
            X
          </p>
          <div>
            <p>인증 메일이 발송되었습니다</p>
            <button>이메일 재발송</button>
          </div>
          <div>
            <button>인증하기</button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ModalSignup;
