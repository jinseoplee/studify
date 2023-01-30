import Dashboardstyle from "./Dashboard.module.css";
const userdummy = {
  userName: "김싸피",
  userLine: "열심히 하겠습니다",
  userSkill: ["파이썬", " 자바"],
  userBadge: ["hello"],
};

const DashboardProfile = () => {
  return (
    <div className={Dashboardstyle.dashboardProfileContainer}>
      <div className={Dashboardstyle.dashboardProfilePic}>프로필 사진</div>
      <div className={Dashboardstyle.dashboardProfileName}>
        {userdummy.userName}
      </div>
      <div className={Dashboardstyle.dashboardProfileFollow}>팔로잉</div>
      <div className={Dashboardstyle.dashboardProfileLine}>
        {userdummy.userLine}
      </div>
      <div className={Dashboardstyle.dashboardProfileSkill}>
        <h4>유저 스킬</h4>
        <br></br>
        {userdummy.userSkill}
      </div>
      <div className={Dashboardstyle.dashboardProfileBadge}>
        <h4>나의 뱃지</h4>
        <br></br>
        {userdummy.userBadge}
      </div>
    </div>
  );
};

export default DashboardProfile;
