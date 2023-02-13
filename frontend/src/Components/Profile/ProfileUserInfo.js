import ProfileStyle from "../../Style/Profile/Profile.module.css";

const ProfileUserInfo = ({ userinfo }) => {
  return (
    <>
      <div className={ProfileStyle.UserInfoContainer}>
        <div className={ProfileStyle.profileUserName}>{userinfo.name}</div>
        <div>
          <div>기수 : {userinfo.generation}기</div>
          <div>지역 : {userinfo.region}</div>
          <div>반 : {userinfo.classNum}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileUserInfo;
