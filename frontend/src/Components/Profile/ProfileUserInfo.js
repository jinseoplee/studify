import ProfileStyle from "../../Style/Profile/Profile.module.css";

const ProfileUserInfo = () => {
  return (
    <div className={ProfileStyle.UserInfoContainer}>
      <p className={ProfileStyle.profileUserName}>김싸피</p>
      <p>자기소개 글</p>
    </div>
  );
};

export default ProfileUserInfo;
