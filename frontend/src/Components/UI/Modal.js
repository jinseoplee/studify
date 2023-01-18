import { useState,useRef } from "react";
import './Modal.css'
import ModalBasic from "./ModalBasic";

const Modal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <button onClick={showModal}>모달</button>
      {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
    </div>
  );
};

export default Modal;
