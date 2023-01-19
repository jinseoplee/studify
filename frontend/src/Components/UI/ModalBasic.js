const ModalBasic = ({ setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <button onClick={closeModal}>확인</button>
      <p>모달창</p>
    </div>
  );
};

export default ModalBasic;
