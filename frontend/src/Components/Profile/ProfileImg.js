import { useRef, useState } from "react";
import axios from "axios";

import filesample from "../../assets/image/file.png";
import ModalContainer from "../UI/ModalContainer";
import ModalStyle from "../../Style/Profile/Profile.module.css";

const ProfileImg = ({ open, onClose, email }) => {
  const [fileImg, setFileImage] = useState(`${filesample}`);
  const fileInput = useRef(null);

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };
  const handlePicChange = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const onChangeImg = async (e) => {
    e.preventDefault();
    // console.log(e.target.files);

    if (e.target.files) {
      // const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      console.log(formData);
      await axios({
        method: "put",
        url: "/api/v1/users/image",
        data: formData,
        headers: {
          "X-Auth-Token":
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJpYXQiOjE2NzU4NDEzOTksImV4cCI6MTY3NTg0NDk5OX0.eLiBTDxwnO5F4bYbSZUL1I5ctHDRYYZTneiLKg2TJ6U",
          "Content-Type": "multipart/form-data",
        },
      });
    }
  };

  const saveUserPic = async () => {
    await axios
      .put(
        "/api/v1/users/image",
        {
          image: fileImg,
        },
        {
          headers: {
            "X-Auth-Token":
              "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJpYXQiOjE2NzU4NDEzOTksImV4cCI6MTY3NTg0NDk5OX0.eLiBTDxwnO5F4bYbSZUL1I5ctHDRYYZTneiLKg2TJ6U",
            "Content-Type": "multipart/form-data",
          },
        },
        {}
      )
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
              <button
                onClick={onChangeImg}
                className={ModalStyle.profileUploadBtn}
              >
                저장하기
              </button>
            </div>
            <form>
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
