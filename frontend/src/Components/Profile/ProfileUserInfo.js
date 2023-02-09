import ProfileStyle from "../../Style/Profile/Profile.module.css";

const ProfileUserInfo = ({ username, usergene, userregion, userClassNum }) => {
  return (
    <>
      <div className={ProfileStyle.UserInfoContainer}>
        <div className={ProfileStyle.profileUserName}>{username}</div>
        <div>
          <div>기수 : {usergene}기</div>
          <div>지역 : {userregion}</div>
          <div>반 : {userClassNum}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileUserInfo;
