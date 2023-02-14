import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import filesample from "../../assets/image/file.png";
import ModalContainer from "../UI/ModalContainer";
import ModalStyle from "../../Style/Profile/Profile.module.css";

const ProfileImg = ({ open, onClose, email }) => {
  const userToken = useSelector((state) => state.token.accesstoken);
  const [fileImg, setFileImage] = useState(`${filesample}`);
  const fileInput = useRef(null);
  const token = useSelector((state) => state.token.accesstoken);

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };
  const handlePicChange = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const onChangeImg = async (e) => {
    e.preventDefault();

    if (e.target.files) {
      // const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      console.log(formData.get("image"));
      await axios({
        method: "post",
        url: "/api/v1/users/image",
        data: formData,
        headers: {
          "X-Auth-Token": `${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }
  };

  const deletePic = async () => {
    await axios
      .delete("/api/v1/users/image", {
        headers: {
          "X-Auth-Token": `${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!open) return null;
  return (
    <div>
      <ModalContainer>
        <div className={ModalStyle.profileModal}>
          <p onClick={onClose}>x</p>
          <div className={ModalStyle.profileModalBody}>
            <h3>프로필 이미지 업로드</h3>
            <img alt="sample" src={fileImg} style={{ width: "250px" }}></img>
            <div className={ModalStyle.profileUploadBtnbox}>
              <button
                onClick={handleButtonClick}
                className={ModalStyle.profileUploadBtn}
              >
                파일 선택
              </button>
              <button className={ModalStyle.profileUploadBtn}>저장하기</button>
              <button
                className={ModalStyle.profileUploadBtn}
                onClick={deletePic}
              >
                삭제하기
              </button>
            </div>
            <form onSubmit={onChangeImg}>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={onChangeImg}
              />
            </form>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default ProfileImg;
