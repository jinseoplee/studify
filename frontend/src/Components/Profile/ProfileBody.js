import ProfileStyle from "../../Style/Profile/Profile.module.css";
import badgesample from "../../assets/image/badge_first.png";

const ProfileBody = () => {
  return (
    <div className={ProfileStyle.ProfileUserContainer}>
      <div className={ProfileStyle.profileStreak}>
        <img
          src="https://ghchart.rshah.org/8A6BCD/jinseoplee"
          style={{ width: "85%" }}
          alt="스트릭"
        />
      </div>
      <div className={ProfileStyle.profileBadge}>
        <p>뱃지 목록</p>
        <div className={ProfileStyle.badgeBox}>
          <img
            src={badgesample}
            alt="뱃지1"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileBody;
