import ProfileStyle from "../../Style/Profile/Profile.module.css";

const ProfileUserInfo = ({ userinfo }) => {
  return (
    <>
      <div className={ProfileStyle.UserInfoContainer}>
        <div className={ProfileStyle.profileUserName}>{userinfo.name}</div>
        <div>
          {userinfo.generation}기 {userinfo.region} {userinfo.classNum} 반
        </div>
      </div>
    </>
  );
};

export default ProfileUserInfo;
