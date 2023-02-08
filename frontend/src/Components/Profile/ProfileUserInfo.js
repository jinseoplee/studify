import ProfileStyle from "../../Style/Profile/Profile.module.css";

const ProfileUserInfo = ({ username, usergene, userregion }) => {
  return (
    <div className={ProfileStyle.UserInfoContainer}>
      <p className={ProfileStyle.profileUserName}>{username}</p>
      <div>
        <span>{usergene}기</span>
        <span>{userregion}</span>
      </div>

      <p>자기소개 글</p>
    </div>
  );
};

export default ProfileUserInfo;
